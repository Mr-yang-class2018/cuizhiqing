<style lang='less'>
.shop_msg{
  text-align: left;
}
.shop_num {
  margin:20px 0;
  display: flex;
  font-size: 12px;
  flex-wrap: wrap;
  > span {
    flex: 1;
    &:first-child{
      border-right: 1px solid #ddd;
    }
    p{
      margin-top: 0;
      font-size:14px;
    }
  }
}
.shop_cont{
  .el-button{
    font-size: 12px;
    padding:10px 23px 10px 45px;
    position: relative;
    img{
      width:14px;
      height:14px;
      position: absolute;
      left: 22px;
      top:9px;
    }
  }
  
}
</style>
<template>
  <div id="shopInfo" style="padding-top:30px;padding-bottom:20px;">
    <div class="shop_msg">
      <img :src="shopInfo.shopLogo" alt="《店铺商标》" />
      <span title="标题">{{shopInfo.shopName?shopInfo.shopName:'没有店铺名字'}}</span>
      <span>{{shopInfo.category=='自营'?'自营':''}}</span>
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
      <el-button type="default" round>
        <img src="~assets/img/wx.png" alt="">
        收藏店铺</el-button>
      <el-button type="default" round @click="pushrouper('/shopdet/'+$route.params.id)">
        <img src="~assets/img/dp.png" alt="">
        进入店铺</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "shopInfo",
  data() {
    return {};
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
  computed: {},
  created() {},
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {},
};
</script>

