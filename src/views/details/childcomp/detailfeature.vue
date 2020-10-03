<template>
  <feature divid="detailfeature" :goodslen="goodslen" :detright="true"  :iszhixing='true'>
    <featureitem v-for="(img,index) in dfeature" :key="index">
      <li>
        <a href="javascript:;">
          <img :src="$store.state.path+'/goods/'+img" width="100%" />
        </a>
      </li>
    </featureitem>
    <div style="margin:30% auto auto 10%;">释放查看详情</div>
  </feature>

</template>
<script>
import { feature, featureitem } from "components/common/feature";
export default {
  name: "detailfeature",
  props: {
    dfeature: {
      type: Array,
      default() {
        return [];
      },
    },
    goodslen: {
      type: Number,
      default: 0,
    },
  },
  mounted() {},
  components: {
    feature,
    featureitem,
  },
};
</script>

<style>
#details .feature-item li {
  width: 100vh;
  margin:0;

}
#details .feature-item li img {
  width: 100%;
  margin-left: 0;
}
</style>