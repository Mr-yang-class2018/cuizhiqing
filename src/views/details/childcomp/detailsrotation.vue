<template>
  <rotation  :showiiactord='false' divid="rotationbox" :detright="true" :goodslen='goodslen'>
    <rotation-item v-for="(img,index) in goodsimg" :key="index">
      <a href="javascript:;">
        <img :src="path1+'/goods/'+img" alt />
      </a>
    </rotation-item>
  </rotation>
 
</template>
<script>
import Rotation from "components/common/rotation/rotation.vue";
import RotationItem from "components/common/rotation/rotationItem.vue";

export default {
  name: "detailrotation",
  props: {
    goodsimg: {
      type: Array,
      default() {
        return [];
      }
    },
    path1:{
      type:String,
      default:'http://106.12.85.17:8090/public/image'
    },
    goodslen:{
      type:Number,
      default:0
    }
  },
  components: {
    Rotation,
    RotationItem
  }
};
</script>
<style>

</style>

