<template>
  <rotation :interval="intime" :showiiactord='true' divid="rotationbox">
    <rotation-item v-for="(item,index) in cbanners" :key="index">
      <a :href="item.href">
        <img :src="$store.state.path+'/banner/'+item.crs" alt />
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
  components: {
    Rotation,
    RotationItem
  }
};
</script>
<style>

</style>
