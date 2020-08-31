<template>
  <tabbar>
    <tabbaritem v-for="(item,index) in arr1" :key="index" :path2="path2">
      <img slot="item-icon" :src="'~/assets/img/'+item.icon" />
      <div slot="item-text">000</div>
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
      }
    },
    path2: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      tabbararr: []
    };
  },
  created() {
  },
  components: {
    tabbar,
    tabbaritem
  },
  methods: {}
};
</script>
