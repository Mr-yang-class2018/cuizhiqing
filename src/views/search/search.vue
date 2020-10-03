<template>
  <div class="search">
    <navbar class="home-nav-bar">
      <div slot="left" @click="$store.commit('BACK')">&lt;</div>
      <div slot="center">
        <!-- <el-input v-model="input" placeholder="请输入内容" v-on="tosearch"></el-input> -->
        <input type="search" placeholder="衣服" v-model="search"/>
      </div>
      <div slot="right">搜索</div>
    </navbar>
    <div class="searchhist">
      <dl>
        <dt>最近搜索</dt>
        <dd></dd>
      </dl>
      <dl>
        <dt>热门搜索</dt>
        <dd></dd>
      </dl>
    </div>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar.vue";

export default {
  name: "search",
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (to.path == "/search") {
        vm.$root.$children[0].page4 = "search";
      }
    });
  },
  created() {},
  data() {
    return {
      search:null
    };
  },
  components: {
    navbar,
  },
  watch: {
    search(newval){
      console.log(newval)
    }
  },
  methods: {},
  // mounted() {},

  beforeRouteUpdate(to, from, next) {
    // 路由改变，组件被复用,调用的守卫
    next();
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
};
</script>
<style scoped>
.home-nav-bar {
  background: white;
}
.search {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background: #ddd;
  z-index: 10;
  width: 100%;
}
.searchhist {
  padding: 0 15px;
  background: white;
}
dl {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
}
dl dt {
  width: 100%;
  text-align: left;
  font-weight: bold;
  font-size: 14px;
}
dl dd {
  width: 33%;
  margin-bottom: 10px;
  margin-left: 0;
}
</style>
