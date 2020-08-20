<template>
  <div id="goodslistitem"
    :class="{goodlistitem:true,transverse:isdrection,portrait:!isdrection}"
    @click="todetails(citem)"
  >
    <a href="javascript:;">
      <img :src="$store.state.path+'/goods/'+citem.img_cover" @load="loadmore" />
      <span>{{citem.name}}</span>
    </a>
  </div>
</template>

<script>
export default {
  name: "goodlistitem",
  props: {
    citem: {
      type: Object,
      default() {
        return {};
      },
    },
    isdrection: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      num: 0,
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    todetails(item) {
      this.$router.push("/details/" + item.id);
    },
    loadmore() {
      //  this.num+=1;
      // 默认情况下，在vue中是不存在bus总线的，在使用的时候，需要我们定义$bus总线
      this.$bus.$emit("goodsimageload");
    },
  },
};
</script>
<style scoped>
.goodlistitem {
  border-bottom: 3px solid black;
}
.goodlistitem.portrait {
  width: 48%;
  margin: 0 1%;
}
.goodlistitem.portrait img {
  display: block;
  width: 50%;
  margin: 10px auto;
}
.goodlistitem.portrait span {
  text-align: left;
  display: block;
  line-height: 40px;
}
.goodlistitem.transverse {
  width: 100%;
}
.goodlistitem.transverse a {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.goodlistitem.transverse a img {
  width: 40%;
}
.goodlistitem.transverse a span {
  display: block;
  width: 60%;
  text-align: center;
}
</style>
