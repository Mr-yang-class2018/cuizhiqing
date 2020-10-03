<template>
  <tabbar>
    <tabbaritem
      v-for="(item,index) in arr"
      :key="item.title"
      :cstyle="tabbarstyle"
      :index='index'
      :path1="index==2?'/jxindex' : item.path"  
    >
      <img slot="item-icon" :src="$store.state.path+'/tabbar/'+item.img" />
      <img slot="item-icon-active" :src="$store.state.path+'/tabbar/'+item.activeImg" />
      <div slot="item-text">{{item.title}}</div>
    
    </tabbaritem>
  </tabbar>
</template>
<script>
import tabbar from "components/common/tabbar/tabbar.vue";
import tabbaritem from "components/common/tabbar/tabbarItem.vue";
// import { getTabbar } from "network/maintabbar.js";
export default {
  name: "shoptabbar",
  data() {
    return {
      tabbarstyle: {
        bgcolor: "transparent",
        activebg: "transparent",
        color: "black",
        activetext: "red",
      },
      tabbararr: [],
    };
  },
  created() {
    // this.maintab();
  },
  props:{
    arr:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components: {
    tabbar,
    tabbaritem,
  },
  methods: {
    // maintab(path='/jd_tabbar') {
    //   getTabbar(path).then((res) => {
    //     this.tabbararr = [...res.data];
    //   });
    // },
  },
};
</script>
