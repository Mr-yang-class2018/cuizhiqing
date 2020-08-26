<template>
  <div class="confirmrder">
    <!-- 注意问题：在确认订单页面时可以更改商品数量的
    如果有修改数据，记得去找修改购物车数据接口去修改-->
    <scroll ref="confimscroll" class="confimscroll">
      <navbar>
        <div slot="left" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center" class="tab-center">确认订单</div>
      </navbar>

      <div class="shopnamemess" v-if="changeAddr==null" @click="pushrouper('/addaddr/0')">
        <div>
          <button>请添加地址</button>
        </div>
        <div class="el-icon-arrow-right" style="flex:1;line-height:68px;"></div>
        <div class="p">
          <p></p>
        </div>
      </div>
      <div class="shopnamemess" @click="pushrouper('/address')" v-else>
        <div>
          <strong>{{changeAddr.takeover_name}}</strong>
          <p>{{changeAddr.takeover_tel | changeTel}}</p>
          <p>{{changeAddr.takeover_addr}}</p>
          <p>{{changeAddr.default}}</p>

        </div>
        <div class="el-icon-arrow-right" style="flex:1;line-height:68px;"></div>
        <div class="p">
          <p></p>
        </div>
      </div>
      <div class="shoplist" v-for="(item,key,index) in shop1" :key="index">
        <div>{{key}}</div>

        <div v-for="(list,index) in item" :key="index" class="bottomdet">
          <div class="ordertail">
            <div class="listimg">
              <img :src="$store.state.path+'/goods/'+list.img_cover" alt />
            </div>
            <div class="cardet" style="flex:5">
              <div>{{list.goods_name}}</div>
              <div class="norm-box" style="font-size:12px;">
                <p class="norm">
                  <em
                    style="width: 90px;display: inline-block;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
                  >{{list.goods_name}}</em>
                  <span>
                    ,选服务
                    <i class="el-icon-arrow-down"></i>
                  </span>
                </p>
              </div>

              <div class="pricenum">
                <span>{{list.money_now}}</span>
                <span>{{list.num}}</span>
              </div>
            </div>
          </div>
          <div>配送</div>
          <div>店铺备注</div>
        </div>
      </div>

      <div class="msgorder">
        <div>发票信息</div>
        <div>发票信息</div>
        <div>发票信息</div>
        <div>发票信息</div>
      </div>
      <div class="msgorder2">
        <div>商品金额</div>
        <div>运费</div>
        <div>实付金额</div>
        <div style="margin:10px">
          <el-button
            type="primary"
            @click="dialogVisible = true"
            plain
            style="display:block;width:100%;margin-bottom:10px;"
          >货到付款</el-button>

          <el-dialog
            :visible.sync="dialogVisible"
            width="88%"
            top="34vh"
            :modal="false"
            :show-close="false"
          >
            <img
              src="../../assets/img/warn.png"
              style="display: block;
    width: 50px;
    height: 50px;
    margin: 5px auto 10px;"
            />
            <span>是否确认使用货到付款提交订单</span>
            <div>货到付款订单总价</div>
            <div>含货到付款运费：免运费</div>

            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>

          <el-button type="primary" style="display:block;width:100%;" @click="confirm_order">在线支付</el-button>
        </div>

        <img
          src="~/assets/img/jd_logo.png"
          alt
          style="display: block;
    width: 100px;
    height: 20px;
    margin: 20px auto 40px auto;"
        />

        <div>此订单不支持以下支付方式</div>
      </div>
    </scroll>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar";
import scroll from "components/content/scroll/scroll";
import { createorder, updataorderstate } from "network/order.js";
export default {
  name: "confirmorder",
  data() {
    return {
      orderData: {
        user_id: "",
        shopcarts_id: [],
      },
      dialogVisible: false,
      shop: [],
      shop1: {},
      money: 0,
    };
  },
  components: {
    navbar,
    scroll,
  },
  created() {
    this.shop = JSON.parse(this.$route.params.shop);
    console.log(this.shop);
    this.get_shop();
    this.$store.state.isshow = true;
    console.log(this.changeAddr);
  },
  computed: {
    changeAddr() {
      return this.$store.state.changeAddr;
    },
  },
  beforeRouteLeave(to, from, next) {
    this.$store.state.confirmhist = from.path;
    next()
  },
  methods: {
    confirm_order() {
      this.orderData = {
        user_id: "",
        shopcarts_id: [],
      };
      this.orderData.user_id = this.$store.state.userinfo.id;
      this.shop.forEach((item) => {
        this.orderData.shopcarts_id.push(item.id);
      });
      if (window.confirm("是否确认提交订单")) {
        createorder(this.orderData).then((res) => {
          if (res.code != 200) {
            this.$router.push("/profile");
          }
          updataorderstate({ order_id: res.data.order_id, state: 1 }).then(
            (res) => {
              console.log(res);
            }
          );
          this.$store.state.shopcart = null;
          this.$store.state.totalnum = 0;
          this.$store.state.checkedCities = [];
          this.$store.state.shopcargoodsnum = 0;
          this.$store.state.shopCartNameArr = [];
          this.$store.state.changeAddr = this.$store.state.userinfo.defaddr;

          this.$store.dispatch("getshopcart", this.$store.state.userinfo.id);
          this.$router.push("/pay/" + res.data.order_id);
        });
      }
    },
    get_shop() {
      var arr = {},
        arrname = [];
      console.log(this.shop);
      // 逐条去处购物车页面的商品数据
      this.shop.forEach((item) => {
        // this.money+=item.money_now*item.num
        let yy = arrname.indexOf(item.shop_name);
        if (yy != -1) {
          arr[item.shop_name].push(item);
        } else {
          arrname.push(item.shop_name);
          arr[item.shop_name] = [];
          arr[item.shop_name].push(item);
        }
      });
      this.shop1 = arr;
      console.log(this.shop1, arrname);
    },
  },
  filters: {
    changeTel(val) {
      return val.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    },
  },
};
</script>
<style lang='less'>
.confirmrder {
  background: #ccc;
  .content {
    > div {
      background: white;
    }
    > div:not(:first-child) {
      margin-bottom: 10px;
    }
    .shopnamemess {
      position: relative;
      display: flex;

      flex-wrap: wrap;
      border-top: 1px solid #ddd;
      > div:first-child {
        flex: 7;
        text-align: left;
        padding-top: 14px;
        p {
          margin-top: 8px;
          margin-bottom: 0px;
        }
      }
      > div:not(:last-child) {
        padding-left: 10px;
      }
    }
    .shoplist {
      // margin-bottom: 10px;
      > div {
        padding: 0 10px;
        &:first-child {
          border-bottom: 1px solid #ddd;
          text-align: left;
        }
      }
      .bottomdet {
        > div {
          border-bottom: 1px solid #ddd;
        }
      }
      .ordertail {
        display: flex;
        .listimg {
          width: 86px;
          height: 86px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .cardet {
          padding-left: 10px;
          .pricenum {
            display: flex;
            span {
              flex: 1;
              text-align: left;
              &:nth-child(2) {
                text-align: right;
              }
            }
          }
        }
      }
    }
    .msgorder {
      padding: 0 10px;
      > div {
        border-bottom: 1px solid #ddd;
        text-align: left;
      }
    }
    .msgorder2 {
      margin-bottom: 0 !important;
      > div {
        &:not(:last-child) {
          text-align: left;
          padding: 0 10px;
        }
        &:last-child {
          border-bottom: 1px solid #ddd;
        }
      }
    }
    .el-button + .el-button {
      margin-left: 0;
      margin-top: 10px;
    }
    .p {
      width: 100%;
      p {
        background: url("../../assets/img/orderxt.png") -7px bottom repeat-x;
        height: 10px;
        margin: 0;
        // margin-left:-4px;
        background-size: 65px 4px;
      }
    }
  }
}
.confimscroll {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  float: left;
}
.el-dialog__header {
  padding: 0;
}
.dialog-footer .el-button {
  width: 48%;
  border-radius: 20px;
  &:first-child {
    margin-right: 3%;
  }
}
</style>
