<template>
  <div id="details">
    <navbar @leftparent="$store.commit('BACK')" class="navbarfir">
      <div slot="left">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="right">
        <pagejump></pagejump>
      </div>
    </navbar>

    <navbar @leftparent="$store.commit('BACK')" class="navbarsec">
      <div slot="left">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center" class="tab-center">
        <div
          v-for="(item,index) in titlearr"
          class="tabcenter-item"
          :key="index"
          @click="clickdet(index)"
          :class="item==isactive?'active':null"
        >{{item}}</div>
      </div>
      <div slot="right">
                <pagejump></pagejump>
      </div>
    </navbar>

    <scroll
      class="detcontent"
      ref="detcontent"
      :probeType="3"
      @parentscroll="detscroll"
      :pull-up-load="true"
    >
      <!-- <details-rotation :goodsimg="goodsimg" :path1="path" :goodslen='goodslen'></details-rotation> -->
      <detailfeature :dfeature="goodsimg" :goodslen="goodslen" ref="detailfeature"></detailfeature>
      <detailinfo />

      <div style="border-top:1px solid #ddd;" class="dettotal">
        <div>
          <div class="price">
            <div>
              <span style="color:red;">{{detailsgoods.money_now | changeprice("￥")}}</span>
              <span
                style="color:#ddd;text-decoration:line-through;"
              >{{detailsgoods.money_old | changeprice("￥")}}</span>
            </div>
            <div>
              <div>
                <i></i>
                <span>降价提醒</span>
              </div>
              <div>
                <i></i>
                <span>收藏</span>
              </div>
            </div>
          </div>
          <div style="text-align:left;">{{detailsgoods.c_keyword}}</div>
        </div>

        <div class="detlist">
          <dl>
            <dt>已选</dt>
            <dd>撒地方个桃花源居留言或他人的士费威风威风王峰萨芬撒</dd>
          </dl>
          <dl>
            <dt>送至</dt>
            <dd></dd>
          </dl>
          <dl>
            <dt>运费</dt>
            <dd></dd>
          </dl>
        </div>

        <div class="pjia" style="height:200px;">
          <div class="title">
            <div style="text-align:left;">评价</div>
            <div style="text-align:right">好评度</div>
          </div>
        </div>

        <div class="dianpu" style="height:200px;">店铺信息</div>
        <div class="detaildet" style="height:500px;">
          <div style="text-align:left;">猜你喜欢</div>
          <ul>{{detailsgoods}}</ul>
        </div>

        <div class="commonddet" style="margin-bottom:0;">
          <div class="titlenav">
            <div
              v-for="(item,index) in comnavarr"
              :key="index"
              @click="num=index"
              class="comtitle"
              :class="index==num?'active':null"
            >{{item}}</div>
          </div>
        </div>
        <div class="comconnect" style="border-radius:0;height:200px;">
          <div v-if="0==num">商品介绍</div>
          <div v-if="1==num">规格参数</div>
          <div v-if="2==num">售后保障</div>
        </div>
      </div>
    </scroll>
    <detbar></detbar>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar";
import detbar from "components/content/mainTabbar/detBar";
// import detailsRotation from "./childcomp/detailsrotation";
import detailfeature from "./childcomp/detailfeature";
import detailinfo from "./childcomp/detailbaseinfo";
import scroll from "components/content/scroll/scroll";
import { getgoods, getgoodsId } from "network/goods";
import pagejump from "components/common/pageJump/pageJump";

export default {
  name: "detail",
  data() {
    return {
      getdata: {
        //提交的数据
        exact: {
          //精确查找
        },
        // page: 1,
      },
      detailsgoods: {},
      goodsimg: null,
      titlearr: ["商品", "评价", "详情", "推荐"],
      comnavarr: ["商品介绍", "规格参数", "售后保障"],
      opacityfir: 1,
      opacitysec: 0,
      position1: 0,
      goodslen: 0,
      elem: null,
      indexhis: {},
      isactive: null,
      num: 0,
    };
  },
  components: {
    navbar,
    // detailsRotation,
    scroll,
    detailfeature,
    detailinfo,
    detbar,
    pagejump
  },
  created() {
    this.getdata.exact.id = this.$route.params.id;
    this.getGoods(this.getdata.exact.id);
    //  在keep-alive状态下，created()方法只执行1次，因为当前组件不会销毁
  },
  activated() {},
  methods: {
    detscroll(position) {
      var chan = this.position1 - position.y;
      this.position1 = position.y;
      if (Math.abs(position.y) < this.indexhis.shop) {
        this.isactive = "商品";
        if (-position.y < 100) {
          document.querySelector(".navbarfir").style.opacity =
            this.opacityfir - 0.01 * chan;
          this.opacityfir -= 0.01 * chan;
          document.querySelector(".navbarsec").style.opacity =
            this.opacitysec + 0.01 * chan;
          this.opacitysec += 0.01 * chan;
        } else if (position.y < -100) {
          document.querySelector(".navbarfir").style.opacity = 0;
          document.querySelector(".navbarsec").style.opacity = 1;
          this.opacityfir = 0;
          this.opacitysec = 1;
        }
      } else if (Math.abs(position.y) < this.indexhis.pjia) {
        this.isactive = "评价";
      } else if (Math.abs(position.y) < this.indexhis.detaildet) {
        this.isactive = "详情";
      } else {
        this.isactive = "推荐";
      }
    },
    getGoods(data) {
      getgoodsId(data).then((res) => {
        this.detailsgoods = res.data.goodsData;
        this.goodsimg = res.data.goodsData.img_detalis_list;
        this.goodslen = this.goodsimg.length;
      });
    },
    getGoods1(data) {
      getgoods(data).then((res) => {
        this.detailsgoods = [...res.data];
      });
    },
    clickdet(index) {
      if (index == this.titlearr.length - 1) {
        this.elem = ".commonddet";
      } else if (index == 1) {
        this.elem = ".pjia";
      } else if (index == 2) {
        this.elem = ".detaildet";
      } else if (index == 0) {
        this.elem = "#detailfeature";
      }
      if (index != 0) {
        document.querySelector(".navbarfir").style.opacity = 0;
        document.querySelector(".navbarsec").style.opacity = 1;
        this.opacityfir = 0;
        this.opacitysec = 1;
      }

      this.$refs.detcontent.scrollTo1(
        0,
        -document.querySelector(this.elem).offsetTop + 60,
        300
      );
    }
  },
  filters: {
    changeprice(val, str) {
      if (arguments[1]) {
        return str + Number(val).toFixed(2);
      } else {
        return Number(val).toFixed(2);
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (to.path.split("/")[1] == "details") {
        vm.$root.$children[0].page4 = "det";
      }
    });
  },
  mounted() {
    this.indexhis = {
      shop: document.querySelector(".pjia").offsetTop + 60,
      pjia: document.querySelector(".detaildet").offsetTop + 60,
      detaildet: document.querySelector(".commonddet").offsetTop + 60,
    };
  },
};
</script>
<style lang='less'>
#details {
  background: #ddd;
  /* padding-top: 44px; */
  height: 100vh; /*把本身高度分成100分*/
  position: relative;
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    .left,
    .right,
    .left,
    .right {
      width: 30px;
      height: 30px;
      line-height: 32px;
      margin-top: 7px;
    }
    .right {
      line-height: 30px;
    }
    .tab-center {
      display: flex;
      .tabcenter-item {
        flex: 1;
      }
    }
  }
  .navbarfir {
    opacity: 1;
    background: transparent;
    color: white;
    padding: 0 7px;
    .el-dropdown {
      color: white;
    }
    .left,
    .right {
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.3);
    }
  }
  .navbarsec {
    opacity: 0;
    background: white;
    padding: 0 7px;
  }
  // #rotationbox {
  //   height: 40vh;
  //   width: 100%;
  // }
  .detcontent {
    position: absolute;
    top: 0px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .dettotal {
    > div {
      background: white;
      padding: 10px;
      margin-bottom: 20px;
      border-radius: 8px 8px;
    }
    .detlist dl {
      display: flex;
      dt {
        flex: 2;
      }
      dd {
        flex: 8;
      }
    }
    .pjia .title {
      display: flex;
      > div {
        flex: 1;
      }
    }

    .price {
      display: flex;
      > div {
        flex: 1;
        display: flex;
        div,
        > span {
          flex: 1;
        }
      }
    }
    .commonddet {
      .titlenav {
        display: flex;
        .comtitle {
          flex: 1;
        }
      }
    }
  }
}

.el-message-box__wrapper {
  top: initial;
  bottom: -20px;
}
.el-message-box {
  width: 100%;
}
.active {
  border-bottom: 1px solid red;
}
</style>

