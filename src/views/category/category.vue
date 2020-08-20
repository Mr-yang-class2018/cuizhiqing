<template>
  <div id="category">
    <!-- <homefeature :cfeature="feature" ></homefeature> -->
    <!-- <ul class="one">
      <li v-for="item in jd_category_one" :key="item.c1_id">
        <button>{{item.c1_name}}</button>
      </li>
    </ul>-->
    <navbar class="home-nav-bar">
      <div slot="left" @click="$store.commit('BACK')">&lt;</div>
      <!-- <div slot="left" @click="$router.go(-1)">&lt;</div> -->

      <div slot="center">
        <i class="el-icon-search"></i>
        <input type="search" name placeholder="衣服" @focus="pushrouper('/saerch')" id />
      </div>
      <div slot="right">
         <pagejump></pagejump>
        <!-- <el-row>
          <el-col>
            <el-dropdown trigger="click">
              <span class="el-icon-more"></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  icon="el-icon-s-custom"
                  class="fl"
                  @click.native="pushrouper('/home')"
                >
                  <span>首页</span>
                </el-dropdown-item>
                <el-dropdown-item
                  icon="el-icon-search"
                  class="fl"
                  @click.native="pushrouper('/category')"
                >
                  <span>分类搜索</span>
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-shopping-cart-1" class="fl">
                  <span>购物车</span>
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-user" class="fl">
                  <span>我的京东</span>
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-check" class="fl">
                  <span>浏览记录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row> -->

       
      </div>
    </navbar>
    <scroll class="one" ref="one">
      <tabcontrol
        :controlid="tabcontrolid"
        :titlearr="jd_category_one"
        @tabclick="tabcontrolclick"
        ref="categorycontrol"
      >
        <!-- ref='categorycontrol'相当于对又定义了一个名字 -->
        <div :class="{active:controlindex==0}" @click="tabcontrolclick(0)">
          <span>热门推荐</span>
        </div>
      </tabcontrol>
    </scroll>
    <scroll class="two" ref="two" :probeType="3" @parentscroll="conentscroll">
      <div v-if="controlindex==0">
        <dl v-if="shophistory.length">
          <dt>
            浏览记录
            <el-button type="text"  @click="rmHistory">清空</el-button>
          </dt>
          <catrgoryitem
            v-for="(item,key) in shophistory"
            :key="key"
            :item="item"
            :bool="false"
            @shoppingclick="shoppingclick"
          ></catrgoryitem>
        </dl>
        <cateall>
          <category1 :controlindex="controlindex">
            <catrgoryitem
              v-for="(item,key) in secmenulist"
              :key="key"
              :item="item"
              :bool="true"
              @shoppingclick="shoppingclick"
            ></catrgoryitem>
          </category1>
        </cateall>
      </div>
      <div v-if="controlindex!==0">
        <cateall>
          <category1
            v-for="(list,index) in secmenulist"
            :key="index"
            :index="index"
            :controlindex="controlindex"
          >
            <catrgoryitem v-for="(item,key) in list" :key="key" :item="item"></catrgoryitem>
          </category1>
        </cateall>
      </div>
    </scroll>
    <maintabbar></maintabbar>
  </div>
</template>
<script>
import maintabbar from "components/content/mainTabbar/mainTabbar.vue";
import navbar from "components/common/navbar/navbar.vue";
import tabcontrol from "components/content/tabControll/tabControl";
// import catetwogoodslist from "components/content/catetwogoodlist/catetwogoodslist";
// import dtcate from "components/content/catetwogoodlist/dtcate";
import cateall from "components/common/categroyAll/cateAll";
import { debounce } from "common/utils";
import pagejump from "components/common/pageJump/pageJump";

import category1 from "components/common/categroyAll/category1";
import catrgoryitem from "components/common/categroyAll/categoryItem";
import scroll from "components/content/scroll/scroll";
// import homefeature from "./childcomp/catefeature";
import {
  get_jd_category_one,
  get_jd_category_two,
  get_jd_category_three,
} from "network/category";

export default {
  name: "category",
  data() {
    return {
      feature: [],
      // 动态定义组件名字
      tabcontrolid: "categorycontrol",
      jd_category_one: [],
      jd_category_two: [],
      jd_category_three: [],
      controlindex: 0,
      secmenulist: null, //可能是数组也可能是对象
      shophistory: [], //已经浏览的记录，在发生页面跳转后，在路由守卫中记录当前请求的数据，并在页面跳转前，存储到shophistory
    };
  },
  components: {
    // homefeature
    tabcontrol,
    scroll,
    maintabbar,
    navbar,
    cateall,
    category1,
    catrgoryitem,
    pagejump
    // catetwogoodslist,
    // dtcate
  },
  created() {
    // this.getfeature()
    this.get_jd_category_one();
    this.get_jd_category_two();
    this.get_jd_category_three();
  },
  methods: {
    // 定义点击左边业务相关事件
    tabcontrolclick(index) {
      if (index == 0) {
        this.secmenulist = [];
        // 循环遍历表3取出ishot==1的值存到secmenulist
        // 本身返回一个新数组
        this.secmenulist = [
          ...this.jd_category_three.filter((threelist) => {
            if (threelist.c3_ishot == 1) {
              return true; //条件成立存到新数组
            }
            return false; //不成立不存
          }),
        ];

        // var arr = this.jd_category_three.filter(threelist => {
        //   if (threelist.c3_ishot == 1) {
        //     return true; //条件成立存到新数组
        //   }
        //   return false; //不成立不存
        // });
        // this.secmenulist = [...arr]; //循环赋值
      } else {
        this.secmenulist = {};
        this.jd_category_two.forEach((twolist) => {
          if (twolist.c1_id == index) {
            this.secmenulist[twolist.c2_name] = {};
            this.jd_category_three.forEach((threelist) => {
              if (threelist.c2_id == twolist.c2_id) {
                this.secmenulist[twolist.c2_name][
                  threelist.c3_name
                ] = threelist;
              }
            });
          }
        });
      }
      // 传递进来的参数用于判断按钮是否被选中
      this.controlindex = index;
      // 回传数据给子组件/修改子组件的数据
      this.$refs.categorycontrol.itemindex = index;
      console.log(this.$refs.one)
     this.$refs.one.scrollTo1(0, -41*index, 300);

    },
    // pushrouper(path1) {
    //   this.$router.replace(path1); //得到的是上一个页的路径
    // },
    conentscroll(position) {
      console.log("被使用", position);
    },
    // 网络请求
    get_jd_category_one() {
      get_jd_category_one().then((res) => {
        if (res.data) this.jd_category_one.push(...res.data);
      });
    },
    get_jd_category_two() {
      get_jd_category_two().then((res) => {
        if (res.data) this.jd_category_two.push(...res.data);
      });
    },
    get_jd_category_three() {
      get_jd_category_three().then((res) => {
        if (res.data) this.jd_category_three.push(...res.data);
        this.tabcontrolclick(this.controlindex);
      });
    },
    
    rmHistory() {
      let that = this;
      this.$confirm("是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          that.shophistory = [];
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    loadmore() {
      this.$bus.$emit("goodsimageload");
    },
    shoppingclick(shop, bool) {
      if (bool) this.shophistory.push(shop);
    },
  },
  mounted() {
    // this.scroll = new BScroll(this.$refs.one, {
    //   click: true
    // });
    // this.scroll = new BScroll(this.$refs.two, {
    //   click: true
    // });
    const refresh = debounce(this.$refs.two.refreshscroll, 1000);
    this.$bus.$on("goodsimageload1", () => {
      // 当图片加载完成，在goodlistitem中通过$bus总线执行当前方法，然后对bscroll进行重新计算高度
      // this.$refs.two.refresh();
      refresh();
    });
  },
};
</script>
<style scoped>
#category {
  /* display: flex; */
  font-size: 12px;
}
i {
  width: 6%;
  line-height: 30px;
  background: #ddd;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  font-size: 14px;
  padding-left: 4%;
}
.el-button {
  font-size: 16px;
  width: 10%;
  color: black;
  border-left: 2px solid rgb(202, 199, 199);
  margin-top: 12px;
  padding: 0;
}
.el-button--text:focus,
.el-button--text:hover {
  color: black;
  border-left: 2px solid rgb(202, 199, 199);
  background-color: white;
}
.el-dropdown-menu {
  background: rgba(0, 0, 0, 0.9);
  width: 20vh;
}
.el-dropdown-menu__item {
  color: white;
}
.el-dropdown-menu__item i {
  margin-right: 10px;
}
.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: rgba(0, 0, 0, 0.9);
}
input[type="search"] {
  width: 90%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  height: 30px;
  background: #ddd;
  border: none;
  margin-left: -1px;
}
input[type="search"]:focus {
  outline: none;
}
.el-icon-search:before {
  padding: 0 5px 0 auto;
}
.one {
  /* flex: 1; */
  background: #ddd;
  height: calc(100vh - 98px);
  overflow: hidden;
  float: left;
  width: 20%;
}

.one li {
  width: 100%;
}
.navbar {
  border-bottom: 1px solid rgb(168, 167, 167);
}
/* .one button {
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
} */
@media screen and (max-width: 768px) {
  .two {
    flex: 3;
    background: white;
    height: calc(100vh - 98px);
    overflow: hidden;
  }
}
@media screen and (min-width: 768px) {
  .two {
    flex: 6;
    background: green;
    height: calc(100vh - 98px);
    overflow: hidden;
  }
}
.active {
  color: red;
  background: #fff;
}
.phb {
  color: #ddd;
  font-size: 12px;
}
.two dl {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.two dl dt {
  width: 100%;
  text-align: left;
  font-weight: bold;
  font-size: 14px;
}
.two dl dd {
  width: 33%;
  margin-bottom: 10px;
  margin-left: 0;
}
.two dl dd img {
  width: 80%;
  display: block;
  margin: 0 auto;
}
</style>

