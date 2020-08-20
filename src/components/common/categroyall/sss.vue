<template>
  <div class="ddd">
    <cateall>
      <category1 v-if="controlindex==0">
        <catrgoryitem v-for="(item,key) in secmenulist" :key="key" :item="item"></catrgoryitem>
      </category1>
      <category1
        v-for="(list,index) in secmenulist"
        :key="index"
        :index="index"
        :controlindex="controlindex"
        v-else
      >
        <catrgoryitem v-for="(item,key) in list" :key="key" :item="item"></catrgoryitem>
      </category1>
    </cateall>
  </div>
</template>

<script>
import cateall from "components/common/categroyAll/cateall";

import category1 from "components/common/categroyAll/category1";
import catrgoryitem from "components/common/categroyAll/categoryItem";
export default {
  name: "ddd",
  data() {
    return {};
  },
  props: {
    controlindex: {
      type: Number,
      default: 0,
    },
    secmenulist: null,
    shophistory: {
      type: Array,
      default() {
        return [];
      },
    },
    path: {
      type: String,
      default: "http://106.12.85.17:8090/public/image/jd_category/",
    },
  },
  components: {
    cateall,
    category1,
    catrgoryitem,
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped>
</style>
