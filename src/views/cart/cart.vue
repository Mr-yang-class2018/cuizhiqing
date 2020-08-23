<template>
  <div id="cart">
    <scroll ref="cartscroll" class="cartscroll">
      <navbar>
        <div slot="left" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center" class="tab-center">购物车</div>
        <div slot="right">
          <pagejump></pagejump>
        </div>
      </navbar>
      <div class="cartcont">
        <div class="cartadd" v-if="this.$store.state.shopcartlength">
          <el-button
            type="text"
            @click="!$store.state.userinfo?dialogVisible1 = true:dialogVisible = true"
          >{{$store.state.shopingaddress}}</el-button>
          <el-dialog
            title="选择地址"
            :visible.sync="dialogVisible1"
            width="100%"
            v-if="!$store.state.userinfo || dialogVisible1==true"
          >
            <div>
              <span
                :class="index==num?'active':''"
                @click="num=index"
                v-for="(i,index) in arrarea"
                :key="index"
              >{{i}}</span>
            </div>
          </el-dialog>

          <el-dialog
            title="选择地址"
            :visible.sync="dialogVisible"
            width="100%"
            v-if="$store.state.userinfo"
          >
            <div>地址</div>

            <el-button type="text" round @click="dialogVisible1 = true">选择其他地址</el-button>
          </el-dialog>

          <div style="flex:2;" @click="bji=!bji" v-if="bji">编辑商品</div>
          <div style="flex:2;" @click="bji=!bji" v-if="!bji">完成</div>
        </div>

        <div v-if="!this.$store.state.userinfo">
          登录后可同步账户购物车中的商品
          <button @click="pushrouper('/login')">登录</button>
        </div>

        <div>
          <img src="../../assets/img/shop.png" v-if="!this.$store.state.shopcartlength" alt />
          <div v-if="!this.$store.state.userinfo">登录后可同步账户购物车中的商品</div>
          <div v-if="this.$store.state.userinfo && !this.$store.state.shopcartlength">购物车空空如也，去逛逛吧</div>
        </div>
      </div>

      <cartgoods
        v-for="(item,key,index) in $store.state.shopcart"
        :key="index"
        :shopname="key"
        :index="index"
        ref="cart_goods"
        @totalmoney="totalmoney"
        @ischeckshopall="is_check_shop_all"
      ></cartgoods>
    </scroll>

    <shopcartab
      v-if="this.$store.state.shopcartlength"
      @hhh="hhh"
      @totalmoney="totalmoney"
      :bji="bji"
      ref="tabBar"
      @confirm_goods="confirm_goods"
      @payment="payment"
    >{{this.$store.state.shopcartlength}}</shopcartab>
  </div>
</template>
<script>
import cartgoods from "./childcomp/cartgoods";
import navbar from "components/common/navbar/navbar";
import pagejump from "components/common/pageJump/pageJump";

import shopcartab from "components/content/mainTabbar/shopcartTab";
import scroll from "components/content/scroll/scroll";
import { updatashopcart } from "network/shopcar";
export default {
  name: "cart",
  components: {
    navbar,
    shopcartab,
    scroll,
    cartgoods,
    pagejump,
  },
  data() {
    return {
      // ee: false,
      bji: true,
      paymentdataarr: [],
      dialogVisible: false,
      dialogVisible1: false,
      arrarea: ["中国大陆", "港澳台及海外"],
      num: 0,
    };
  },
  //   如果用户存在，则网络请求getshopcat数据
  created() {
    if (!this.$store.state.userinfo) {
      this.$store.dispatch("autocode");
    }
    if (this.$store.state.userinfo && this.$store.state.shopcartlength == 0) {
      this.getshopcart();
      // this.totalmoney();
    }
    if(this.$store.state.userinfo){
      this.addr()
    }
    
  },
  beforeRouteLeave(to, from, next) {
  
    if (to.path == "/login") this.$store.state.loginhistory = from.path;

    if(this.$store.state.userinfo)  this.updatashopcart();
    next();
  },
  computed: {
    shopCartNameArr() {
      return this.$store.state.shopCartNameArr;
    },
  },
  methods: {
    selectnorm(data) {
      console.log(data);
    },
    getshopcart() {
      this.$store.dispatch("getshopcart", this.$store.state.userinfo.id);
    },
     addr() {
      this.$store.dispatch("searchAddr", {
        user_id: this.$store.state.userinfo.id,
      });
    },
    // -----------------------------------
    totalmoney() {
      this.$store.state.totalpayment = 0;
      this.$store.state.totalnum = 0;
      for (var key in this.$store.state.shopcart) {
        for (var f = 0; f < this.$store.state.shopcart[key].length; f++) {
          if (this.$store.state.shopcart[key][f].ischeck == "1") {
            console.log(this.$store.state.shopcart);
            this.$store.state.totalpayment +=
              this.$store.state.shopcart[key][f].money_now *
              this.$store.state.shopcart[key][f].num;
            this.$store.state.totalnum += this.$store.state.shopcart[key][
              f
            ].num;
          }
        }
      }
    },
    updatashopcart() {
      let shopcart = { ...this.$store.state.shopcart };
      let shopcarthistory = { ...this.$store.state.shopcarthistory };
      for (let i in shopcart) {
        for (let j = 0; j < shopcart[i].length; j++) {
          if (
            shopcart[i][j].ischeck != shopcarthistory[i][j].ischeck ||
            shopcart[i][j].num != shopcarthistory[i][j].num ||
            shopcart[i][j].norm != shopcarthistory[i][j].norm
          ) {
            let data = {};
            data.id = shopcart[i][j].id;
            data.num = shopcart[i][j].num;
            data.ischeck = shopcart[i][j].ischeck;
            data.norm = shopcart[i][j].norm;
            updatashopcart(data);
          }
        }
      }
    },
    hhh(checked) {
      this.$store.state.checkedCities = checked ? this.shopCartNameArr : [];
      this.$refs.cart_goods.forEach((item) => {
        let label = item.$el.querySelectorAll(".el-checkbox__label");
        var aaa = [];
        label.forEach((text) => {
          aaa.push(text.innerText);
        });
        if (checked) {
          item.indexArr = aaa;
        } else {
          item.indexArr = [];
        }
      });
      for (var key in this.$store.state.shopcart) {
        for (var f = 0; f < this.$store.state.shopcart[key].length; f++) {
          this.$store.state.shopcart[key][f].ischeck = Number(
            checked
          ).toString();
        }
      }
      this.totalmoney();
    },

    //是否是全选商品
    is_check_shop_all() {
      let cart_goods = this.$refs.cart_goods;
      let tabbar = this.$refs.tabBar;
      let allCheck = tabbar.$el.querySelector("input[type=checkbox]");
      let temp = 0;
      cart_goods.forEach((item) => {
        let shopNameCheck = item.$el.querySelector(
          ".shopname input[type=checkbox]"
        );
        if (shopNameCheck.checked) {
          temp++;
        }
      });
      if (temp == cart_goods.length) {
        alert("3");
        allCheck.checked = true;
      } else {
        allCheck.checked = false;
      }
    },
    confirm_goods() {
      // 找到购物车内需要做支付的商品是哪一个
      // 直接查找shopcart的ischeck=1，添加到data里边传递到confirm_order
      // let data = ["整个商品数据", "整个商品数据", "整个商品数据"];
      // this.$router.push("/confirmorder/" + data);
      let data = {};
      for (var key in this.$store.state.shopcart) {
        this.$store.state.shopcart[key].forEach((item) => {
          if (item.ischeck == 1) {
            if (data[key]) {
              data[key].push(item);
            } else {
              data[key] = [item];
            }
          }
        });
      }

      let flag = true;
      for (let i in data) {
        i;
        flag = false;
        break;
      }

      if (flag) return;
      data = JSON.stringify(data);
      this.$router.push("/confirmorder/" + data);
    },
    payment() {
      let arr = [];
      for (let i in this.$store.state.shopcart) {
        this.$store.state.shopcart[i].forEach((item) => {
          if (item.ischeck == "1") {
            arr.push(item);
          }
        });
      }
      console.log(JSON.stringify(arr));
      this.$router.push("/confirmorder/" + JSON.stringify(arr));
    },
  },
  
};
</script>
<style lang='less'>
#cart {
  background: #ddd;
  overflow: hidden;
  .content > div {
    background: white;
  }
  .cartcont {
    border-top: 1px solid #ddd;
    margin-bottom: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    > div {
      padding: 10px 0;
    }
    .cartadd {
      display: flex;
      padding-left: 18px;

      > div:last-child {
        flex: 2;
      }
      .el-button.el-button--text {
        flex: 5;
        text-align: left;
      }
      .el-button {
        padding: 0;
      }
      .el-dialog {
        position: absolute;
        bottom: 0;
        margin: 0;
      }
      .el-dialog__body {
        padding: 0;
        > div {
          width: 60%;
          display: flex;
          flex-wrap: wrap;

          > span {
            flex: 1;
            padding: 10px 0;
            font-size: 14px;
          }
        }
        .active {
          border-bottom: 1px solid red;
        }
      }
      .el-button.el-button--danger.is-round {
        width: 98%;
        padding: 10px 0;
      }
    }
  }
  .cartscroll {
    width: 100%;
    height: calc(100vh - 100px);
    overflow: hidden;
    float: left;
  }
}

// ----------------------------------
.el-checkbox__input.is-focus {
  .el-checkbox__inner {
    border-color: #dcdfe6;
  }
}
.el-checkbox__input.is-checked {
  .el-checkbox__inner {
    background-color: red;
    border-color: red;
  }
}
.el-checkbox__inner {
  border-radius: 50%;
  width: 20px;
  height: 20px;
  &:after {
    top: 4px;
    left: 7px;
  }
}
</style>

