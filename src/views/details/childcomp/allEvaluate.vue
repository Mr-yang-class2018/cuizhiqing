<template>
  <div id="allEva">
    <navbar class="home-nav-bar" v-if="$store.state.isshow==true">
      <div slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">商品评价</div>
    </navbar>
    <scroll ref="allEvalScroll" class="allEvalScroll">
      <ul>
        <li v-for="(i,index) in allEvaluate" :key="index">
          <div class="title">
            <div style="text-align:left;">
              <img :src="$store.state.path+'/evaluate/'+i.headPortrait" alt />
              <span>{{i.username}}</span>
              <span>{{i.highpraise}}</span>

              <span>{{i.time}}</span>
            </div>

            <!-- 评价应为倒序排列。最新评价在最上面 -->
            <div
              style="text-overflow:ellipsis;overflow:hidden;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;"
            >{{i.val}}</div>
          </div>
          <div class="value">
            <ul style="overflow:hidden;">
              <li
                v-for="(item,index) in i.evaluationImg"
                :key="index"
                style="float:left;margin-right:5px;"
              >
                <img :src="$store.state.path+'/evaluate/'+item" alt />
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </scroll>
    <detbar></detbar>
  </div>
</template>

<script>
import { allEvaluate } from "network/goods";
import { Evaluate } from "common/utils";
import navbar from "components/common/navbar/navbar.vue";
import scroll from "components/content/scroll/scroll";
import detbar from "components/content/mainTabbar/detBar";

export default {
  name: "allEva",
  data() {
    return {
      allEvaluate: null,
    };
  },
  components: {
    navbar,
    scroll,
    detbar
  },
  computed: {},
  created() {
    allEvaluate(this.$route.params.shopid).then((res) => {
      this.allEvaluate = new Evaluate(res.data);
      console.log(this.allEvaluate);
    });
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {},
};
</script>
<style lang='less'>
.allEvalScroll {
  height: calc(100vh - 98px);
  overflow: hidden;
  float: left;
}
</style>
