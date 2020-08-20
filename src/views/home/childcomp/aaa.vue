<template>
  <rotation :interval="intime" :showiiactord='false' divid="aaabox">
    <rotation-item v-for="(item,index) in cbanners" :key="index">
      <a :href="item.href">
        <img :src="path+item.crs" alt />
      </a>
    </rotation-item>
  </rotation>
</template>
<script>
import Rotation from "components/common/rotation/rotation.vue";
import RotationItem from "components/common/rotation/rotationItem.vue";

export default {
  name: "homerotation",
  props: {
    cbanners: {
      type: Array,
      default() {
        return [];
      }
    },
    intime:{
      type:Number,
      default:1000
    }
  },
  data() {
    return {
      path: "http://106.12.85.17:9091/public/image/banner/"
    };
  },
  components: {
    Rotation,
    RotationItem
  }
};
</script>
<style>

</style>
