<template>
  <div id="cart">
    <scroll ref="cartscroll" class="cartscroll" v-loading="this.$store.state.loading">
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
          >{{address}}</el-button>
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
          <img
            src="../../assets/img/shop.png"
            v-if="$store.state.shopcart==null&&$store.state.shopcartlength==0"
            alt
          />
          <div
            v-if="!$store.state.userinfo&&this.$store.state.userinfo && !this.$store.state.shopcartlength"
          >登录后可同步账户购物车中的商品</div>
          <div v-if="this.$store.state.userinfo && !this.$store.state.shopcartlength">购物车空空如也，去逛逛吧</div>
        </div>
      </div>

      <cartgoods
        v-for="(item,key,index) in $store.state.shopcart"
        :key="index"
        :shopname="key"
        :index="index"
        ref="cart_goods"
        :localShopCart="localShopCart"
        @totalmoney="totalmoney"
        @ischeckshopall="is_check_shop_all"
      ></cartgoods>
      <!-- <cartgoods
        v-for="(item,key,index) in $store.state.shopcart"
        :key="index"
        :shopname="key"
        :index="index"
        ref="cart_goods"
        @totalmoney="totalmoney"
        @ischeckshopall="is_check_shop_all"
      ></cartgoods>-->
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
import { SET_USERINFO } from "store/mutation-types";
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
      localShopCart: {}, //本地存储的购物车
      arrarea: ["中国大陆", "港澳台及海外"],
      num: 0,
    };
  },
  //   如果用户存在，则网络请求getshopcat数据
  created() {
    if (!this.$store.state.userinfo) {
      this.$store.state.loading = true;
      this.$store.dispatch("autocode", {
        resolve: (res) => {
          if (res.code != 200) return;
          this.$store.commit(SET_USERINFO, {
            data: res.data,
            success: (res) => {
              this.$store.dispatch("getshopcart", res.data.user.id);
            },
          });
           this.$store.dispatch("getshopcart",res.data.user.id );
        },
      });
    }
    
    if (this.$store.state.userinfo) {
      this.getshopcart();
    }
    this.getLocalShopCart();
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/login") this.$store.state.loginhistory = from.path;

    if (this.$store.state.userinfo) this.updatashopcart();
    next();
  },
  computed: {
    shopCartNameArr() {
      return this.$store.state.shopCartNameArr;
    },
    address() {
      //取出地址中的指定默认配送地址
      let addr = "";
      if (this.$store.state.userinfo) {
        addr = this.$store.state.changeAddr.takeover_addr;
      } else {
        let data = window.localStorage.getItem(this.$store.state.localData);
        if (data != null && data != "")
          addr =
            JSON.parse(data).orderAddr != undefined
              ? JSON.parse(data).orderAddr
              : this.$store.state.shopingaddress;
        else addr = this.$store.state.shopingaddress;
      }
      return addr.split(",").join(" ");
    },
  },
  methods: {
    getLocalShopCart() {
      this.$store.state.shopcartlength = 0;
      let data = window.localStorage.getItem(this.$store.state.localData);
      data =
        data != null && data != "" && data != undefined ? JSON.parse(data) : [];
      console.log(data.shopcart);
      if (
        data.shopcart != undefined &&
        data.shopcart != "" &&
        data.shopcart != null
      ) {
        data.shopcart.forEach((item) => {
          if (!this.localShopCart[item.shop_name]) {
            this.localShopCart[item.shop_name] = [];
          }
          this.localShopCart[item.shop_name].push(item);
        });
        this.$store.state.shopcartlength++;
        this.$store.state.shopcart = this.localShopCart;
        console.log(this.localShopCart);
      }
     
 this.$store.state.loading = false;
      // this.localShopCart = data.shopcart ? data.shopcart : [];

      // this.$store.state.shopcartlength = this.localShopCart.length;
    },
    selectnorm(data) {
      console.log(data);
    },
    getshopcart() {
      this.$store.dispatch("getshopcart", this.$store.state.userinfo.id);
    },

    // -----------------------------------
    totalmoney() {
      this.$store.state.totalpayment = 0;
      this.$store.state.shopcargoodsnum = 0;
      for (var key in this.$store.state.shopcart) {
        for (var f = 0; f < this.$store.state.shopcart[key].length; f++) {
          if (this.$store.state.shopcart[key][f].ischeck == "1") {
            console.log(this.$store.state.shopcart[
              key
            ][f].num)
            this.$store.state.totalpayment +=
              this.$store.state.shopcart[key][f].money_now *
              this.$store.state.shopcart[key][f].num;
            this.$store.state.shopcargoodsnum += this.$store.state.shopcart[
              key
            ][f].num;
          }
        }
      }
      this.$refs.tabBar.checkAll =
        this.$store.state.checkedCities.length === this.shopCartNameArr.length;
      console.log(this.$store.state.checkedCities,this.shopCartNameArr);
      // console.log(this.$refs.cart_goods);
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
            data.takeover_addr = shopcart[i][j].takeover_addr;

            updatashopcart(data);
          }
        }
      }
    },
    hhh(checked) {
      console.log(checked);
      console.log(this.$store.state.checkedCities);
      console.log(this.$store.state.shopCartNameArr);
      this.$store.state.checkedCities = checked
        ? this.$store.state.shopCartNameArr
        : [];
      this.$refs.cart_goods.forEach((item) => {
        let label = item.$el.querySelectorAll(
          ".shopcardet .el-checkbox__label"
        );
        let aaa = [];
        label.forEach((text) => {
          aaa.push(text.innerText);
        });
        if (checked) {
          alert("che");
          item.indexArr = aaa;
        } else {
          alert("!che");

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
      console.log(this.$store.state.checkedCities);
      console.log(this.indexArr);
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
      this.$router.push("/confirmorder/aaa");
    },
    payment() {
      this.$store.state.paymentgoods = [];
      let cart_goods = this.$refs.cart_goods;
      cart_goods.forEach((item) => {
        //获取每个组件内。商品前的复选框组
        for (let i = 0; i < item.goods.length; i++) {
          if (item.goods[i].ischeck == "1") {
            //可以定义cart全局的，方便以后自己及组件使用
            this.$store.state.paymentgoods.push(item.goods[i]);
          }
        }
      });
      let data = window.localStorage.getItem(this.$store.state.localData);
      data =
        data != undefined && data != null && data != "" ? JSON.parse(data) : {};
      data.paymentgoods = this.$store.state.paymentgoods;
      window.localStorage.setItem(
        this.$store.state.localData,
        JSON.stringify(data)
      );
      this.$router.push("/confirmorder/aaa");
    },
  },
};
</script>
<style lang='less'>
#cart {
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
</style>

