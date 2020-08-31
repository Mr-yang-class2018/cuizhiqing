<template>
  <tabbar>
    <tabbaritem v-for="(item,index) in arr1" :key="index" :index='index' :path2="path2">
      <img slot="item-icon" :src="$store.state.path+'/common/'+item.icon" v-if='item.icon'/>
      <span  slot="item-icon" v-else>{{item.icon1}}</span>
      <!-- <span slot='item-icon'>{{item.icon | getimg}}</span> -->
      <!-- <img slot='item-icon' src="'~/assets/img/'+img" alt=""> -->
      <div slot="item-text">{{item.title}}</div>
    </tabbaritem>
  </tabbar>
</template>
<script>
import tabbar from "components/common/tabbar/tabbar.vue";
import tabbaritem from "components/common/tabbar/tabbarItem1.vue";
export default {
  name: "maintabbar",
  props: {
    arr1: {
      type: Array,
      default() {
        return [];
      },
    },
    path2: {
      type: String,
      default: ""
    }
  },
  created() {
  },
  data() {
    return {
      tabbararr: [],
      // img:require('~assets/img/'+this.arr1[0].icon)
    };
  },
  components: {
    tabbar,
    tabbaritem,
  },
  computed: {},
  methods: {
  },
  filters: {},
};
</script>
