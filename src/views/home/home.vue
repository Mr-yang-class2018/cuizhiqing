<template>
  <div id="home">
    <!-- 头部搜索 -->
    <navbar class="home-nav-bar" @leftparent="pushrouper('/category')">
      <div slot="left">分类</div>
      <div slot="center">
        <!-- <el-input v-model="input" placeholder="请输入内容" v-on="tosearch"></el-input> -->
        <input type="search" placeholder="衣服" @focus="pushrouper('/search')" />
      </div>
      <div slot="right" @click="pushrouper('/login')" v-if="!$store.state.userinfo">登录</div>
      <div slot="right" v-else class="el-icon-s-custom" @click="pushrouper('/profile')"></div>
    </navbar>
    <hr />
    <!-- <ul class="banner">
      <li v-for="(item,index) in banners" :key="index">
        <img :src="path+item.crs" alt />
      </li>
    </ul>-->
    <scroll
      class="homecontent"
      ref="scrollcom"
      :probeType="3"
      @parentscroll="homescroll"
      @pullingUp="loadmore"
      :pull-up-load="true"
    >
      <homerotation :cbanners="banners" :intime="1000"></homerotation>
      <!-- <homefeature :cfeature="feature" iscopy="true"></homefeature> -->
      <homefeature :cfeature="feature"></homefeature>
      <!-- {{aaaa:num}} -->
      <!-- <aaa  :cbanners="banners"> </aaa>-->
      <hr />

      <div>
        <button style="width:100%" @click="changedirection">改变商品数据排列</button>
      </div>

      <div class="tabconent">
        <div class="tabtitle">
          <button @click="tabclick('recomend')">recomend</button>
          <button @click="tabclick('news')">news</button>
        </div>
        <!-- <div v-for="(item,key) in goods" :key="key">
          <ul v-if="tabcurrenttype==key">
            <li v-for="(i,index) in item.list" :key="index">
              <a href="javascript:;">
                <img :src="path+i.c3_img" alt />
                <span>{{i.c3_name}}</span>
              </a>
            </li>
          </ul>
        </div>-->

        <goods-list :goods="showgoodslist" :changedirc="paredirec"></goods-list>
      </div>
    </scroll>
    <a class="totop" @click="homdetop" v-if="isshowbacktop">返回顶部</a>
  </div>
</template>
<script>
import goodsList from "components/content/goodList/goodList";
import navbar from "components/common/navbar/navbar.vue";
import scroll from "components/content/scroll/scroll";
import homerotation from "./childcomp/homeratation";
import homefeature from "./childcomp/homefeature";
// import aaa from "./childcomp/aaa";

import { getHomeBanner, getfeature, get_jd_category_max } from "network/home";
import { getgoods } from "network/goods";
import { autoland } from "network/user";
import { SET_USERINFO } from "store/mutation-types";
import { debounce } from "common/utils";
// import { requestcity } from "../../network/request";

export default {
  name: "home",
  data() {
    return {
      banners: null,
      feature: [],
      aaaa: 100.1111,
      num: 100,
      isshowbacktop: false,
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
      tabcurrenttype: "recomend",
      paredirec: false,
      savey: 0,
    };
  },
  components: {
    navbar,
    homerotation,
    homefeature,
    scroll,
    goodsList,
    // aaa
  },
  created() {
    //vue实例在创建时的钩子参数
    // 页面在创建的时候我们需要请求数据
    this.getHomeBanner();
    this.getfeature();
    this.getgoodall("recomend");
    this.getgoodall("news");
    // var arr[1,2,3,4,500].filterfeature(100)
  },
  activated() {
    // 在组件激活的时候，调整滚动条的位置
    this.$refs.scrollcom.scrollTo1(0, this.savey, 300);
    this.$refs.scrollcom.refreshscroll();
    if (!this.$store.state.userinfo) {
      this.auto_code();
       this.$store.state.shopcargoodsnum = 0;
      let data = window.localStorage.getItem(this.$store.state.localData);
      data =
        data != null && data != "" && data != undefined ? JSON.parse(data) : [];
      if (
        data.shopcart != undefined &&
        data.shopcart != "" &&
        data.shopcart != null
      ) {
        data.shopcart.forEach((item) => {
          if (item.ischeck=='1') {
          this.$store.state.shopcargoodsnum+=item.num;
          }
        });
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/login") this.$store.state.loginhistory = from.path;

    next();
  },
  deactivated() {
    // 在组件离开的时候，记录滚动条的位置
    this.savey = this.$refs.scrollcom.scroll.y;
    console.log(this.savey);
  },
  computed: {
    showgoodslist() {
      return this.goods[this.tabcurrenttype].list;
    },
  },
  methods: {
    auto_code() {
      let data = window.localStorage.getItem(this.$store.state.localData);
      // 取到的值不为null，则继续执行
      if (data != null && data != undefined && data != "") {
        let autocode = JSON.parse(data).autocode;
        // 登录成功可以取到值，否则取不到值
        autoland({ autocode: autocode }).then((res) => {
          if (res.code != 200) return;
          //每次都更改登陆码，重新设置
          this.$store.commit(SET_USERINFO, res);
          // 获取购物车数据，调用vuex中action的数据
          if (
            res.data.user.id != "" &&
            res.data.user.id != null &&
            res.data.user.id != undefined
          ) {
            this.$store.dispatch("getshopcart", res.data.user.id);
          }
        });
      }
    },
    getHomeBanner() {
      getHomeBanner().then((res) => {
        this.banners = res.data;
        // this.banners = {...res};//数组的解构赋值，三个点代表结构赋值，取出数组的每一个值
      });
    },
    getfeature() {
      getfeature().then((res) => {
        // if(res.code !=200) return console.log('ooo')
        let arr = res.data;
        for (let i = 0; i < arr.length / 10; i++) {
          this.feature.push([]);
          for (let j = 0; j < arr.length; j++) {
            if (parseInt(j / 10) == i) {
              this.feature[i].push(arr[j]);
            }
          }
        }
      });
    },
    homescroll(position) {
      this.isshowbacktop = -position.y > 1000;
    },
    homdetop() {
      this.$refs.scrollcom.scrollTo1(0, 0, 300);
    },
    getgoodall1(type) {
      let page = this.goods[type].page + 1;
      get_jd_category_max(page).then((res) => {
        this.goods[type].page += 1;
        this.goods[type].list.push(...res.data);
        this.$refs.scrollcom.scroll.finishPullUp();
      });
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
      // if(!this.goods[type].list.length){
      //   this.getgoodall(type)
      // }
    },
    changedirection() {
      this.paredirec = !this.paredirec;
    },
  },
  mounted() {
    // 放置图片被刷新多次循环调用，在指定事件内，如果没有图片加载完成，我们在刷新scroll高度
    const refresh = debounce(this.$refs.scrollcom.refreshscroll, 10);
    this.$bus.$on("goodsimageload", () => {
      // 当图片加载完成，在goodlistitem中通过$bus总线执行当前方法，然后对bscroll进行重新计算高度
      // this.$refs.scrollcom.refresh();
      refresh();
    });
  },
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     if ((to.path == "/home")) {
  //       vm.$root.$children[0].page4='true'
  //     }
  //   });
  // },
};
</script>
<style>
#home {
  /* padding-top: 44px; */
  height: 100vh; /*把本身高度分成100分*/
  position: relative;
}
#home .home-nav-bar {
  background: #e43130;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
.homecontent {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
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
.tabconent .tabtitle {
  width: 100%;
  display: flex;
}
.tabconent .tabtitle button {
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
</style>

