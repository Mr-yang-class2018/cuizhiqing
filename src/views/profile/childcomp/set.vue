<template>
  <div id="set">
    <scroll ref="proscroll" class="proscroll">
      <navbar>
        <div slot="left" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center" class="tab-center">账户设置</div>
      </navbar>
      <div class="setlist">
        <div>
          <p>管理我的账户</p>
        </div>
        <div class="gladd">
          <span style="text-align:left;">收货地址管理</span>
          <small style="text-align:right;" @click="pushrouper('/address')">管理我的地址</small>
        </div>
        <ul>
          <li>意见反馈</li>
          <li>京东客户端</li>
          <li @click='signout'>退出登录</li>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar.vue";
import scroll from "components/content/scroll/scroll";
export default {
  name: "set",
  data() {
    return {};
  },
  components: {
    navbar,
    scroll,
  },
  created() {},
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    signout() {
      this.$store.state.userinfo = null;
      this.$store.state.shopcart = null;
      this.$store.state.shopcartlength = 0;
      localStorage.setItem(this.$store.state.localData, "");
      // window.localStorage.clear();
      this.$router.push('/home')

      
    },
  },
   beforeRouteLeave(to, from, next) {
    if (to.path == "/address") {
      this.$store.state.isshow = false;
    }
    next();
  },
};
</script>
<style lang='less' scoped>
#set {
  .setlist {
    padding: 0 14px;
    text-align: left;
    .gladd {
      display: flex;
      flex-wrap: wrap;
      padding: 10px 0;
      * {
        flex: 1;
      }
    }
    > ul {
      display: flex;
      flex-wrap: wrap;
      li {
        float: left;
        flex: 1;
      }
    }
  }
}
</style>
