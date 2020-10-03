<template>
  <div id="page1">
     <goods-list :goods="goodlist" :changedirc="paredirec"></goods-list>

  </div>
</template>

<script>
import { getShopGoods } from "network/goods";
import goodsList from "components/content/goodList/goodList";


export default {
  name: "page1",
  data() {
    return {
      page: 1,
      goodlist:null,
      paredirec: false,
     
    };
  },
  components: {
    goodsList,
  },
  computed: {},
  created() {
    getShopGoods({
      shop_id: this.$route.params.id,
      page: this.page,
      pagesize: 50,
    }).then((res) => {
      this.goodlist=res.data
      console.log(res.data);
    });
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {},
};
</script>
<style lang='scss' scoped>
</style>
