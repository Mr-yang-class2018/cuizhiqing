<template>
  <div class="goodlist">
    <!-- <div v-for="(item,key) in goods" :key="key"> -->
      <!-- <div v-if="tabcurrenttype==key"> -->
        <!-- <div v-for="(i,j) in item.list" :key="j"> -->
          <goodslistitem :citem="item"  v-for="(item,key) in goods" :key="key" :isdrection='changedirc'></goodslistitem>
        <!-- </div> -->
      <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import goodslistitem from './goodsListItem'
export default {
  name: "goodlist",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    },
    
    tabcurrenttype: {
      type: String,
      default: "recomend"
    },
    changedirc:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {};
  },
  components: {
    goodslistitem
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.goodlist{
  display:flex;
  flex-wrap: wrap;
  margin-top: 40px;
}
</style>
