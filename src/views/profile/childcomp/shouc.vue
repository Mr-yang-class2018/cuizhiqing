<template>
  <div id="shouc">
    <scroll ref="scscroll" class="scscroll">
      <navbar>
        <div slot="left" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center" class="tab-center">我的关注</div>
        <div slot="right">
        <pagejump></pagejump>
      </div>
      </navbar>
      <el-tabs v-model="activeName" style="border-top:1px solid #ddd;">
        <el-tab-pane label="商品" name="0"></el-tab-pane>
        <el-tab-pane label="店铺" name="1"></el-tab-pane>
      </el-tabs>
    </scroll>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar.vue";
import scroll from "components/content/scroll/scroll";
import pagejump from "components/common/pageJump/pageJump";

export default {
  name: "shouc",
  data() {
    return {
      activeName: "1"
    };
  },
  components: {
    navbar,
    scroll,
    pagejump
  },
  computed: {},
  created() {
         this.activeName=  this.$route.params.id
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {}
};
</script>
<style lang='less'>
#shouc {
  .el-tabs__nav.is-top {
           .el-tabs__item{
                    padding:0 66px;
           }
    .el-tabs__active-bar.is-top {
//       left: 35%;
    }
  }
}
</style>
