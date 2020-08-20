<template>
  <div class="jx">
    <div class="tabtitle" ref="tabtitle1" v-show="istabfixed">
      <button @click="tabclick('recomend')">今日推荐</button>
      <button @click="tabclick('news')">京东商城</button>
    </div>

    <scroll
      class="homecontent"
      ref="scrollcom"
      :probeType="3"
      @parentscroll="homescroll"
      @pullingUp="loadmore"
      :pull-up-load="true"
    >
      <div style="text-align:center;" v-show="ss">惊喜</div>
      <div class="pofix">
        <navbar class="home-nav-bar">
          <div slot="left" @click="$router.go(-1)">&lt;</div>
          <div slot="center">
            <input type="search" placeholder="衣服" @focus="pushrouper('/search')" />
          </div>
          <div slot="right"></div>
        </navbar>

        <div class="jx1">
          <div class="jx2">精选</div>
          <scroll class="jxone1 fl" ref="jxone1">
            <tabcontrol
              :cont="false"
              :controlid="tabcontrolid"
              :titlearr="jd_category_one"
              ref="categorycontrol"
              direction="transverse"
            ></tabcontrol>
          </scroll>
          <el-button type="text" @click="open" icon="el-icon-arrow-down"></el-button>
        </div>
      </div>
      <div class="jxbj"></div>
      <jxrotation :cbanners="banners" @bannerimgload="bannerimgload" :intime="1000"></jxrotation>

      <jxfeature :cfeature="feature"></jxfeature>
      <hr />

      <div class="tabconent">
        <div class="tabtitle" ref="tabtitle2">
          <button @click="tabclick('recomend')">今日推荐</button>
          <button @click="tabclick('news')">京东商城</button>
        </div>
        <goods-list :goods="showgoodslist" :changedirc="paredirec"></goods-list>
      </div>
    </scroll>
    <a class="totop" @click="homdetop" v-if="isshowbacktop">返回顶部</a>
  </div>
</template>
<script>
import scroll from "components/content/scroll/scroll";
import tabcontrol from "components/content/tabControll/tabControl";
import jxrotation from "./childcomp/jxratation";
import jxfeature from "./childcomp/jxfeature";
import goodsList from "components/content/goodList/goodList";

// import aaa from "./childcomp/aaa";

import { getHomeBanner, getfeature } from "network/home";
import navbar from "components/common/navbar/navbar.vue";
import { get_jd_category_one } from "network/category";
import { getgoods } from "network/goods";
export default {
  name: "jx",
  data() {
    return {
      feature: [],
      isshowbacktop: false,
      jd_category_one: [],
      tabcontrolid: "tabcontrolid",
      banners: null,
      tabcurrenttype: "recomend",
      paredirec: true,
      goods: {
        recomend: {
          page: 2,
          list: [],
        },
        news: {
          page: 10,
          list: [],
        },
      },
      savey: 0,
      ss: false,
      istabfixed: false,
      taboffsettop: 0,
    };
  },
  components: {
    scroll,
    tabcontrol,
    navbar,
    jxrotation,
    jxfeature,
    goodsList,
  },
  activated() {
    this.$refs.scrollcom.scrollTo1(0, this.savey, 300);
    this.$refs.scrollcom.refreshscroll();
  },
  deactivated() {
    // 在组件离开的时候，记录滚动条的位置
    this.savey = this.$refs.scrollcom.scroll.y;
    console.log(this.savey);
  },
  created() {
    this.getfeature();
    this.getgoodall("recomend");
    this.getgoodall("news");
    this.get_jd_category_one();
    this.getHomeBanner();
  },
  computed: {
    showgoodslist() {
      return this.goods[this.tabcurrenttype].list;
    },
  },
  methods: {
    // banner图片加载完处理的事件
    bannerimgload() {
      console.log();
      this.taboffsettop = this.$refs.tabtitle2.offsetTop;
    },
    getHomeBanner() {
      getHomeBanner().then((res) => {
        this.banners = res.data;
        console.log(this.banners);
        // this.banners = {...res};//数组的解构赋值，三个点代表结构赋值，取出数组的每一个值
      });
    },
    // 获取功能视图的数据
    getfeature() {
      getfeature().then((res) => {
        console.log(res);
        let arr = res.data;
        for (let i = 0; i < arr.length / 10; i++) {
          this.feature.push([]);
          console.log(i);
          for (let j = 0; j < arr.length; j++) {
            if (parseInt(j / 10) == i) {
              this.feature[i].push(arr[j]);
            }
          }
        }
        console.log(this.feature);
      });
    },
    homescroll(position) {
      this.isshowbacktop = -position.y > 1000;
      // 回到顶部的按钮显示
      //   // 变成吸顶条
      // 在滑动的时候，判断tab距离页面的高度小于滚动的高度
      this.istabfixed = -position.y > this.taboffsettop;
    },
    homdetop() {
      this.$refs.scrollcom.scrollTo1(0, 0, 300);
    },
    getgoodall(type) {
      let data = {
        page: this.goods[type].page + 1,
        pagesize: 10,
      };
      getgoods(data).then((res) => {
        this.goods[type].page += 1;
        this.goods[type].list.push(...res.data);
        this.$refs.scrollcom.scroll.finishPullUp();
      });
    },
    loadmore() {
      this.getgoodall(this.tabcurrenttype);
    },
    tabclick(type) {
      this.tabcurrenttype = type;
      this.$refs.tabtitle2.itemindex = type;
      this.$refs.tabtitle1.itemindex = type;

      // if(!this.goods[type].list.length){
      //   this.getgoodall(type)
      // }
    },
    changedirection() {
      this.paredirec = !this.paredirec;
    },
    get_jd_category_one() {
      get_jd_category_one().then((res) => {
        if (res.data) this.jd_category_one.push(...res.data);
      });
    },
    open() {
      this.$alert("<strong>这是 <i>HTML</i> 片段</strong>", "HTML 片段", {
        dangerouslyUseHTMLString: true,
        closeOnClickModal: true,
      });
    },
  },
  mounted() {
    // console.log(this.$refs.tabtitle.$el.offsetTop)
  },
};
</script>
<style>
.el-button--text {
  flex: 1;
}
.jx .homecontent {
  position: absolute;
  top: 0px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.jx .pofix {
  /* background: #e43130; */
  background: url(../../assets/img/bj.webp) no-repeat center 53%;
  background-size: 100% auto;
  color: white;
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100; */
}
.jx #rotationbox {
  margin-top:-16vh ;
}
.jx1 {
  display: flex;
  flex-wrap: wrap;
  /* margin-top: 49px; */
}
.jx1 .jx2 {
  line-height: 46px;
  padding-top: 1px;
  flex: 1;
}
.jxbj {
  background: url(../../assets/img/bj.webp) no-repeat center bottom;
  background-size: 100% auto;
  height: 20vh;
}
.jx1 .content {
  white-space: nowrap;
  border: none;
  overflow: hidden;
  display: inline-block;
}
.el-button {
  border: none;
}
.jxone1 {
  flex: 1;
  /* background: #fff; */
  overflow: hidden;
  /* width: 85%; */
  flex: 6;
}
.jxone1 .tabcontrol {
  float: left;
}
.jxone1 .tabcontrol div {
  line-height: 46px;
  font-size: 14px;
  border-bottom: 0;
  display: inline-block;
  text-align: center;
  padding: 0 10px;
}
.jx {
  /* padding-top: 44px; */
  height: 100vh; /*把本身高度分成100分*/
  position: relative;
}

.totop {
  position: absolute;
  bottom: 100px;
  right: 5px;
  background: red;
  /* display: none; */
}
.tabconent {
  display: flex;
  flex-wrap: wrap;
}
.tabtitle {
  width: 100%;
  position: absolute;
  z-index: 100;
  display: flex;
}
.tabtitle button {
  flex: 1;
  height: 40px;
}
.tabconent div {
  width: 100%;
}
.tabconent div ul {
  width: 100%;
}
.tabconent div ul li img {
  width: 30%;
  margin: 0 auto;
  display: block;
}
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
</style>

