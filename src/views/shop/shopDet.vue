<template>
  <div id="shopDet" v-if="bbb">
    <scroll class="ddd" ref="ddd" style="position:absolute;top:0;bottom:49px;">
    <div class="shop_head">
      <div>
        <img :src="shopInfo.shopLogo" alt />
        <div>
          <p>{{ shopInfo.shopName }}</p>
          <p>店铺星级</p>
        </div>
      </div>
      <div>
        <el-button type="danger" round>
          <img src alt />
          收藏
        </el-button>
        <p>{{ shopInfo.collection }}人收藏</p>
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
          v-for="(i, index) in barList"
          :key="index"
          tag="span"
          :to="'/a/page' + (index + 1) + '/' + shopInfo.id"
          >{{ i }}</router-link
        >
      </scroll>
    </div>
    <router-view></router-view>
    </scroll>
    <shop-bar :arr="arr"></shop-bar>
  </div>
</template>

<script>
import shopBar from "components/content/mainTabbar/shopBar";
import pagejump from "components/common/pageJump/pageJump";
import scroll from "components/content/scroll/scroll";
import { getgoodsId } from "network/goods";
import { ShopInfo } from "common/utils";
export default {
  name: "shopDet",
  data() {
    return {
      shopInfo: null,
      bbb: false,
      arr: [
        { img: "aaa", title: "首页", path: "" },
        { img: "aaa", title: "全部商品", path: "" },
        { img: "aaa", title: "商品分类", path: "" },
        { img: "aaa", title: "联系客服", path: "" },
      ],
      barList: ["精品", "商品", "精选", "视频", "买家秀", "动态"],
    };
  },
  components: {
    pagejump,
    scroll,
    shopBar,
  },
  computed: {},
  created() {
    setTimeout(() => {
      this.bbb = true;
    }, 500);
    getgoodsId(this.$route.redirectedFrom.split("/")[2]).then((res) => {
      this.shopInfo = new ShopInfo(res.data.shopData);
      console.log(res.data.shopData);
      this.$router.replace("/shopdet/" + this.shopInfo.id);
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
