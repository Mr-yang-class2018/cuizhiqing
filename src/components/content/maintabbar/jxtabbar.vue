<template>
  <tabbar>
    <!-- <tabbaritem path1="/jxindex"  :cstyle="jxtabstyle">
      <img slot="item-icon" src="~/assets/img/phb_hot.png" />
      <img slot="item-icon-active" src="~/assets/img/phb_hot_active.png" />
      <div slot="item-text">首页</div>
    </tabbaritem> -->
    <tabbaritem v-for="(item,index) in jxtabbar" :key="item.path" :cstyle="jxtabstyle"  :path1="index==0?'/jxindex':'/jx'+item.path">
      <img slot="item-icon" :src="$store.state.path+'/tabbar/'+item.img" />
      <img slot="item-icon-active" :src="$store.state.path+'/tabbar/'+item.aImg" />
      <div slot="item-text">{{item.name}}</div>
    </tabbaritem>
  </tabbar>
</template>
<script>
import tabbar from "components/common/tabbar/tabbar.vue";
import tabbaritem from "components/common/tabbar/tabbarItem.vue";
import { getTabbar } from "network/maintabbar.js";

export default {
  name: "jxtabbar",
  data() {
    return {
      jxtabstyle: {
        bgcolor: "transparent",
        activebg: "transparent",
        color: "black",
        activetext: "red"
      },
      jxtabbar:[]
    };
  },
  components: {
    tabbar,
    tabbaritem
  },
  created(){
    this.maintab()
  },
  methods:{
     maintab(path='/jx_tabbar') {
      getTabbar(path).then((res) => {
        this.jxtabbar = [...res.data];
      });
    },
  }
};
</script>
