<template>
  <div class="bar-item"  @click="gomyorder()">
    <div style="padding:8px 0;">
      <slot name="item-icon"></slot>
    </div>
    <div>
      <slot name="item-text" ></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "tabbaritem",
  props: {
   
  },
  data() {
    return {

    };
  },
  computed: {

  },
  methods: {
     gomyorder(){
      this.$router.push('/myorder')
    }
  }
};
</script>
<style scoped>
#bar .bar-item {
  flex: 1;
  font-size: 14px;
  text-align: center;
}
#bar .bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  margin-bottom: 2px;
  vertical-align: middle;
}
</style>

