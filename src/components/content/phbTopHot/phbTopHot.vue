<template>
  <div>
    <navbar class="home-nav-bar">
      <a href="/category" slot="left">&lt;</a>
      <div slot="center">排行榜</div>
      <div slot="right">
        <el-row>
          <el-col>
            <el-dropdown trigger="click">
              <span class="el-icon-more"></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  icon="el-icon-s-custom"
                  class="fl"
                  @click.native="itemclick('/home')"
                >
                  <span>首页</span>
                </el-dropdown-item>
                <el-dropdown-item
                  icon="el-icon-search"
                  class="fl"
                  @click.native="itemclick('/category')"
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
        </el-row>
      </div>
    </navbar>
    <slot></slot>
  </div>
</template>

<script>
import navbar from "../../common/navbar/navbar.vue";

export default {
  name: "phbtopbot",
  components:{
        navbar  
  },
  created(){
    this.fun()
  },
  methods:{
    itemclick(path1) {
      this.$router.replace(path1); //得到的是上一个页的路径
    },
     fun(){
      this.$root.$children[0].page4="false";
    },
  }
}
</script>
<style>
#phb {
  height: 100vh;
}
.home-nav-bar {
  background: white;
}
#phb .home-nav-bar {
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  color: black;
}
.one1 {
  flex: 1;
  background: #fff;
  overflow: hidden;
  width: 90%;
  /* border-right: 1px solid red; */
}
#phb .content {
  white-space: nowrap;
  border: none;
  overflow: hidden;
  display: inline-block;
}
.one1 .tabcontrol {
  float: left;
  
}
.one1 .tabcontrol div {
  line-height: 46px;
  font-size: 14px;
  border-bottom: 0;
  display: inline-block;
  text-align: center;
  padding: 0 10px;
}
.jx {
  width: 88%;
  text-align: left;
  padding-left: 2%;
}
.v-modal {
  opacity: 0.2;
  top: 100px;
}
.el-message-box {
  width: 100%;
}
.el-message-box__wrapper {
  top: 90px;
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
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
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
.hxgd {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  height: 49px;
  margin-top: 44px;
}

</style>