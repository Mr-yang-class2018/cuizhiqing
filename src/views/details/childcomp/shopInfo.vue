<style lang='less'>
.shop_msg {
  text-align: left;
}
.shop_num {
  margin: 20px 0;
  display: flex;
  font-size: 12px;
  flex-wrap: wrap;
  > span {
    flex: 1;
    &:first-child {
      border-right: 1px solid #ddd;
    }
    p {
      margin-top: 0;
      font-size: 14px;
    }
  }
}
.shop_cont {
  .el-button {
    font-size: 12px;
    padding: 10px 23px 10px 45px;
    position: relative;
    img {
      width: 14px;
      height: 14px;
      position: absolute;
      left: 22px;
      top: 9px;
    }
  }
}
</style>
<template>
  <div id="shopInfo" style="padding-top:30px;padding-bottom:20px;">
    <div class="shop_msg">
      <img :src="shopInfo.shopLogo" alt />
      <span title="标题">{{shopInfo.shopName?shopInfo.shopName:'没有店铺名字'}}</span>
      <span>{{shopInfo.category=='自营'?'自营':'个体'}}</span>
    </div>
    <div class="shop_num">
      <span>
        <p>{{shopInfo.collection}}</p>粉丝数量
      </span>
      <span>
        <p>{{shopInfo.cGoods}}</p>全部商品
      </span>
    </div>
    <div class="shop_cont">
      <el-button
        type="default"
        round
        @click="colectShop()"
        :style="Active?{color:'red'}:{color:'gray'}"
        class="collectshop"
      >
        <!-- <img src="~assets/img/wx.png" alt /> -->
        <i class="el-icon-star-off"></i>
        收藏店铺
      </el-button>
      <el-button type="default" round @click="pushrouper('/shopdet/'+$route.params.id)">
        <img src="~assets/img/dp.png" alt />
        进入店铺
      </el-button>
    </div>
  </div>
</template>

<script>
import { updataCollectShop } from "network/user";
export default {
  name: "shopInfo",
  data() {
    return {
      showcoll: false,
    };
  },
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {},
  computed: {
    Active() {
      let arr = this.$store.state.userinfo.collectShop;
      if (arr.length > 0) {
        return arr.indexOf(this.shopInfo.id) != -1 ? true : false;
      }
      return false;
    },
  },
  created() {
    setTimeout(() => {
      this.$store.state.userinfo.collectShop.forEach((item) => {
        if (this.shopInfo.id == item) {
          this.showcoll = true;
          document.querySelector(".collectshop").style.color = "red";
        }
      });
    }, 500);
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    colectShop() {
      // let ev = ev || window.event;
      // if (!this.$store.state.userinfo) {
      //   this.pushrouper("/login");
      // } else {
      //   this.showcoll = !this.showcoll;
      //   this.showcoll
      //     ? (ev.target.style.color = "red")
      //     : (ev.target.style.color = "gray");
      //   if (this.showcoll) {
      //     if (this.$store.state.userinfo.collectShop.length > 0) {
      //       let num = 0;
      //       this.$store.state.userinfo.collectShop.forEach((item) => {
      //         if (item != this.shopInfo.id) {
      //           num++;
      //         }
      //       });
      //       if (num == this.$store.state.userinfo.collectShop.length) {
      //         this.$store.state.userinfo.collectShop.push(this.shopInfo.id);
      //       }
      //     }
      //   } else {
      //     this.$store.state.userinfo.collectShop.forEach((item, index) => {
      //       if (item == this.shopInfo.id) {
      //         this.$store.state.userinfo.collectShop.splice(index, 1);
      //       }
      //     });
      //   }
      //   updataCollectShop({
      //     id: this.$store.state.userinfo.id,
      //     collectShop: this.$store.state.userinfo.collectShop.join(","),
      //   });
      // }
      // ----------------------------------

      let arr = this.$store.state.userinfo.collectShop;
      if (this.Active) {
        let temp = arr.filter((item) => {
          if (item == this.shopInfo.id) {
            return false;
          }
          return true;
        });
        arr = temp;
      } else {
        arr.push(this.shopInfo.id);
      }

      updataCollectShop({
        id: this.$store.state.userinfo.id,
        collectShop: arr.join(","),
      }).then((res) => {
        console.log(res);
        if (res.code != 200) return;
        let temp1 = this.$store.state.userinfo;
        this.$store.state.userinfo = null;
        temp1.collectShop = arr;
        this.$store.state.userinfo = temp1;
      });
    },
  },
};
</script>

