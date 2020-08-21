<template>
  <tabbar>
    <tabbaritem
      v-for="(item,index) in tabbararr"
      :key="item.path"
      :cstyle="tabbarstyle"
      :index='index'
      :path1="index==2?'/jxindex':index==4? $store.state.userinfo ? item.path : '/login' : item.path"  
    >
      <img slot="item-icon" :src="$store.state.path+'/tabbar/'+item.img" />
      <img slot="item-icon-active" :src="$store.state.path+'/tabbar/'+item.activeImg" />
      <div slot="item-text">{{item.title}}</div>
      <i slot='item-shopc'
          style="position:absolute;top:0;right:0;width: 16px;
    height: 16px;color:red;font-size:12px;text-align:center;border: 1px solid red;border-radius: 50%;"
        >{{$store.state.shopcartlength}}</i>
    </tabbaritem>
  </tabbar>
</template>
<script>
//插槽组件
//@相当于webpack.base.conf.js中的resolve（'src'）函数
import tabbar from "components/common/tabbar/tabbar.vue";
//import tabbar from 'localhost:8080/src/components/tabbar.vue'
//这样写的components是webpack.base.config.js中别名配置的
import tabbaritem from "components/common/tabbar/tabbarItem.vue";
import { getTabbar } from "network/maintabbar.js";
export default {
  name: "maintabbar",
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
    this.maintab();
  },
  components: {
    tabbar,
    tabbaritem,
  },
  methods: {
    maintab(path='/jd_tabbar') {
      getTabbar(path).then((res) => {
        this.tabbararr = [...res.data];
      });
    },
  },
};
</script>
