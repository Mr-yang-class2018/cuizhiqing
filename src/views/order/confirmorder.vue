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
        <div slot="right" @click="pushrouper('/login')" v-if="!$store.state.userinfo">登录</div>
      </navbar>
      <div v-if="this.$store.state.userinfo" class="confirmall">
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
      </div>
      <div v-if="!this.$store.state.userinfo">
        <div>
          <span>收货人</span>
          <input type="text" />
        </div>
        <div>
          <span>联系方式</span>
          <span style="flex:1;">+86</span>
          <i style="flex:1;" class="el-icon-arrow-down"></i>
          <input type="text" style="flex:5" />
        </div>
        <div class="sinArea">
          <span>所在地区</span>
          <el-button type="text">
            <div class="el-icon-arrow-right"></div>
          </el-button>
        </div>
        <div>
          <span>详细地址</span>
          <textarea name id cols="30" rows="10"></textarea>
        </div>
      </div>
    </scroll>
    <el-dialog title="更换地址" :visible.sync="replaceAddr" width="80%">
      <div>你在浏览商品的时候更换了地址，是否匹配更换</div>
      <ul>
        <li v-for="(item,index) in $store.state.addrAll" :key="index" @click="repAaddrId=item.id">
          <input type="radio" :id="'a'+item.id" :checked="repAaddrId==item.id" />
          <label :for="'a'+item.id">{{item.takeover_addr | changeAddr}}</label>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pushrouper('/addaddr/0')">新建地址</el-button>
        <el-button type="primary" @click="replAddr(repAaddrId)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar";
import scroll from "components/content/scroll/scroll";
import { createorder, updataorderstate } from "network/order.js";
import { updatashopcart } from "network/shopcar.js";

import { searchAddr } from "network/address.js";
export default {
  name: "confirmorder",
  data() {
    return {
      orderData: {
        user_id: "",
        shopcarts_id: [],
      },
      replaceAddr: false,
      dialogVisible: false,
      shop1: {},
      repAaddrId: 1,
      money: 0,
    };
  },
  components: {
    navbar,
    scroll,
  },
  created() {
    console.log(window.localStorage.getItem(this.$store.state.localData));
    if (
      window.localStorage.getItem(this.$store.state.localData) == undefined ||
      window.localStorage.getItem(this.$store.state.localData) == null ||
      window.localStorage.getItem(this.$store.state.localData) == ""
    ) {
      this.$router.push("/home");
    }
    // 传递数据到确认订单页面的时候，如果数据都是依靠地址栏进行传递的话，确认订单容易出现空白页，原因是由于地址栏的地址过长，有些数据被修剪，导致读取不出传过来的数据值
    // this.shop =
    //   this.$route.params.shop != undefined
    //     ? JSON.parse(this.$route.params.shop)
    //     : "";
    if (this.$store.state.areahistory.indexOf("/cart") != -1) {
      console.log("是从购物车页面跳转的");
      if (!this.$store.state.userinfo) {
        this.$router.push("/home");
        return;
      }
      // 从购物车页面过来后，如果用户登录了，就查看一下传过来的地址中是否有配送信息不完整的

      for (let i = 0, temp = true; i < this.shop.length; i++) {
        console.log(this.shop[i]);
        let addr = this.shop[i].takeover_addr.split(",");
        if (addr[3] == "" && temp) {
          //让当前的一步循环只执行一次
          this.showReplAddr();
          temp = false; //作用是为了让当前的if只执行一次
        }
        // 修改确认订单页面购买商品的配送地址
        this.updatashopcart({
          id: this.shop[i].id,
          num: this.shop[i].num,
          norm: this.shop[i].norm,
          ischeck: 1,
          takeover_addr: this.changeAddr.takeover_addr,
        });
      }
    }
    if (this.$store.state.areahistory.indexOf("/details") != -1) {
      console.log("是从详情页面进入的");
      let addr = this.shop[0].takeover_addr.split(",");
      if (this.$store.state.userinfo) {
        // 证明配送地址的最后一位(详细地址)没有值
        // 替换地址
        if (addr[3] == "") {
          this.showReplAddr();
        }
      } else {
        // 打开一个遮罩层
        //去登录
        // 填写地址---在后边的电话注册后，添加地址
      }
    }

    // {
    //   console.log("你的页面刷新了");
    //   this.$router.push("/home");
    // }

    // 在正常状态下，如果是从购物车跳转过来的，没有用户登录的情况下，需要回到书页
    // 从订单跳转过来的时候，如果没有用户需要指定配送地址等详细的信息

    // 有用户登录，则看配送信息是否完整

    this.get_shop();
    this.$store.state.isshow = true;
  },
  computed: {
    changeAddr() {
      return this.$store.state.changeAddr;
    },
    shop() {
      let data =
        this.$store.state.paymentgoods != null
          ? this.$store.state.paymentgoods
          : JSON.parse(
              window.localStorage.getItem(this.$store.state.localData)
                .paymentgoods
            );
      return data;
    },
  },
  beforeRouteLeave(to, from, next) {
    this.$store.state.confirmhist = from.path;
    next();
  },
  methods: {
    updatashopcart(data) {
      updatashopcart(data).then((res) => {
        console.log(res);
      });
    },

    confirm_order() {
      // this.orderData = {
      //   user_id: "",
      //   shopcarts_id: [],
      // };
      this.orderData.user_id = this.$store.state.userinfo.id;
      // console.log()
      this.orderData.takeover_addr = JSON.stringify({
        name: this.$store.state.changeAddr.takeover_name,
        tel: this.$store.state.changeAddr.takeover_tel,
        addr: this.$store.state.changeAddr.takeover_addr,
      });

      if (window.confirm("是否确认提交订单")) {
        console.log(this.$store.state.areahistory);
        if (this.$store.state.areahistory.indexOf("/cart") != -1) {
          this.orderData.shopcarts_id = [];
          this.shop.forEach((item) => {
            this.orderData.shopcarts_id.push(item.id);
          });
          createorder(this.orderData).then((res) => {
            if (res.code != 200) {
              this.$router.push("/profile");
            }
            updataorderstate({ order_id: res.data.order_id, state: 1 }).then(
              (res) => {
                console.log(res);
              }
            );
            this.$store.state.changeAddr = this.$store.state.userinfo.defaddr;

            this.$router.push("/pay/" + res.data.order_id);
          });
        }
        if (this.$store.state.areahistory.indexOf("/details") != -1) {
          this.shop.forEach((item) => {
            this.orderData.shopcarts_id = item.goods_id;
            this.orderData.num = item.num;
            this.orderData.norm = item.norm;
          });
          console.log(this.orderData);
          createorder(this.orderData).then((res) => {
            if (res.code != 200) {
              this.$router.push("/profile");
            }
            updataorderstate({ order_id: res.data.order_id, state: 1 }).then(
              (res) => {
                console.log(res);
              }
            );
            this.$store.state.changeAddr = this.$store.state.userinfo.defaddr;

            this.$router.push("/pay/" + res.data.order_id);
          });

          // userorderall(this.orderData).then((res) => {
          //   console.log(res)
          //   if (res.code != 200) {
          //     this.$router.push("/profile");
          //     return console.log("下单失败");
          //   }
          //   alert('lll')
          //   this.$store.state.changeAddr = this.$store.state.userinfo.defaddr;
          //   this.$router.push("/pay/" + res.data.order_id);
          // });
        }
        this.$store.state.paymentgoods = null;
        let data = window.localStorage.getItem(this.$store.state.localData);
        data =
          data != undefined && data != null && data != ""
            ? JSON.parse(data)
            : null;

        if (data != null) {
          data.paymentgoods != undefined &&
          data.paymentgoods != null &&
          data.paymentgoods != ""
            ? delete data["paymentgoods"]
            : null;
          window.localStorage.setItem(
            this.$store.state.localData,
            JSON.stringify(data)
          );
        }

        // this.$store.state.shopcart = null;
        //         this.$store.state.totalnum = 0;
        //         this.$store.state.checkedCities = [];
        //         this.$store.state.shopcargoodsnum = 0;
        //         this.$store.state.shopCartNameArr = [];
        //         this.$store.state.changeAddr = this.$store.state.userinfo.defaddr;
        //         this.$store.dispatch("getshopcart", this.$store.state.userinfo.id);
      }
    },
    showReplAddr() {
      this.replaceAddr = true;
      searchAddr({ user_id: this.$store.state.userinfo.id }).then((res) => {
        let arr = res.data.filter((item) => {
          if (item.default == 1) {
            return true;
          }
          return false;
        });
        this.repAaddrId = arr[0].id;
        console.log(arr[0]);
        this.$store.state.addrAll = res.data;
      });
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
    replAddr(id) {
      console.log(id);
      if (id == null) return;
      this.$store.state.changeAddr = null;
      let arr = this.$store.state.addrAll.filter((item) => {
        console.log(item.id, id);
        if (item.id == id) {
          return true;
        }
        return false;
      });
      console.log(arr[0]);
      this.$store.state.changeAddr = arr[0];
      this.replaceAddr = false;
    },
  },
  filters: {
    changeTel(val) {
      return val.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    },
    changeAddr(val) {
      let addr = val.split(",").join("");
      return addr;
    },
  },
};
</script>
<style lang='less'>
.confirmrder {
  .confirmall {
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
  }

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
</style>
