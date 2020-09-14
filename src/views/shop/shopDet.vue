<template>
  <div id="shopDet">
    <div class="shop_head">
      <div>
        <img :src="'~assets/img/'+shopInfo.shopLogo" alt />
        <div>
          <p>{{shopInfo.shopName}}</p>
          <p>店铺星级</p>
        </div>
      </div>
      <div>
        <el-button type="danger" round>
          <img src alt />
          收藏
        </el-button>
        <p>{{shopInfo.collection}}人收藏</p>
      </div>
      <pagejump></pagejump>
    </div>
    <div class="shop_banner">
      <div>
        <el-button type="default" round>
          <i></i>
          搜商品
        </el-button>
      </div>
      <scroll class="shopone1 fl" ref="shopone1">
        <router-link
          active-class="active"
          v-for="(i,index) in [1,2,3,4,5,6,7,8,9,0]"
          :key="index"
          tag="span"
          :to="{path: '/a/page' + (index+1)}"
        >{{i}}</router-link>
      </scroll>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import pagejump from "components/common/pageJump/pageJump";
import scroll from "components/content/scroll/scroll";
import { getgoodsId } from "network/goods";
import { ShopInfo } from "common/utils";
export default {
  name: "shopDet",
  data() {
    return {
      shopInfo: null,
    };
  },
  components: {
    pagejump,
    scroll,
  },
  computed: {},
  created() {
    getgoodsId(this.$route.redirectedFrom.split("/")[2]).then((res) => {
      this.shopInfo = new ShopInfo(res.data.shopData);
      console.log(this.shopInfo);
    });
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {},
};
</script>
<style lang='less'>
#shopDet {
  .shop_head {
    background: black;
    color: white;
    display: flex;
    flex-wrap: wrap;
    > div {
      flex: 1;
      .el-dropdown {
        color: white;
        line-height: 84px;
      }
    }
    > div:nth-child(2) {
      flex: 2;
    }
    > div:first-child {
      flex: 4;
    }
  }
  .shop_banner {
    background: black;
    display: flex;
    flex-wrap: wrap;
    color: white;
    > div:first-child {
      flex: 1;
      padding: 5px 12px;
    }
    > div:nth-child(2) {
      flex: 4;
    }
  }

  .shopone1 {
    overflow: hidden;
    flex: 6;
    .content {
      white-space: nowrap;
      border: none;
      overflow: hidden;
      display: inline-block;
      // float: left;
      > span {
        line-height: 46px;
        font-size: 14px;
        border-bottom: 0;
        display: inline-block;
        text-align: center;
        padding: 0 10px;
      }
    }
  }
  .active {
    color: red;
  }
}
</style>
