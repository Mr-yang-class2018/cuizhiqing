<template>
  <div class="pagejump">
    <el-dropdown trigger="click" @command="pushrouper">
      <span class="el-dropdown-link">
        <i class="el-icon-more"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="/home">首页</el-dropdown-item>
        <el-dropdown-item command="/keywords">分类搜索</el-dropdown-item>
        <el-dropdown-item command="/search">我的京东</el-dropdown-item>
        <el-dropdown-item command="/profile">浏览记录</el-dropdown-item>
        <el-dropdown-item command="/home">我的关注</el-dropdown-item>
        <el-dropdown-item command="/home">分享</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "pagejump",
  data() {
    return {};
  },
  components: {},
  created() {},
  activated() {},
  deactivated() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
</style>
