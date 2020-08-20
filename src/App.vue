<template>
  <div>
    <!-- 
      缓存中会存有数据记录，所以在使用过的时候，会出现数据不进行替换。 
      正常使用中，如果不使用keep-alive,组件在离开的时候会被销毁
    -->
    <keep-alive :exclude="$store.state.keepexclude" :include="$store.state.keepinclude">
      <router-view />
    </keep-alive>

    <maintabbar v-if="is_jd_tabbar"></maintabbar>
    <phbtabbar v-if='page4=="false"'></phbtabbar>
    <jxtabbar v-if="is_jx_tabbar"></jxtabbar>
  </div>
</template>

<script>
import maintabbar from "components/content/mainTabbar/mainTabbar.vue";
import phbtabbar from "components/content/mainTabbar/phbTabbar.vue";
import jxtabbar from "components/content/mainTabbar/jxTabbar.vue";
import { requestcity } from "network/request";


export default {
  name: "app",
  data() {
    return {
      page4: "true",
    };
  },
  created() {
    requestcity().then((res) => {
      // 如果没有用户登录，配送的地址为获取的地址
      if (!this.user) {
        this.$store.state.shopingaddress = eval(
          "(" + res.slice(res.indexOf("=") + 1, res.length - 1) + ")"
        ).cname;
      }
      // 默认城市为获取的地址
      this.$store.state.city = eval(
        "(" + res.slice(res.indexOf("=") + 1, res.length - 1) + ")"
      ).cname;
      console.log(res.slice(res.indexOf("=") + 1, res.length - 1));
    });
    
  },
  computed: {
    is_jd_tabbar() {
      return this.$store.state.tabbar.is_jd_tabbar;
    },
    is_jx_tabbar() {
      return this.$store.state.tabbar.is_jx_tabbar;
    },
    userinfo() {
      return this.$store.state.userinfo;
    },
    user() {
      return (
        this.userinfo != "" &&
        this.userinfo != null &&
        this.userinfo != undefined
      );
    },
  },
  watch: {
    is_jd_tabbar(newval, oldval) {
      // if(){

      // }
      console.log(newval, oldval);
    },
  },
  components: {
    maintabbar,
    phbtabbar,
    jxtabbar,
  },
 
};
</script>

<style>
@import "assets/css/base.css";
</style>
