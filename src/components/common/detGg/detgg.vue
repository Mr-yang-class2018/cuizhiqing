<template>
  <div id="detGg">
    <scroll
      class="detcontent"
      ref="detcontent"
      :probeType="3"
      :pull-up-load="true"
      style="position: absolute; top: 44px; bottom: 0px; left: 0; right: 0"
    >
      <div v-for="(item, index) in selectNorm.norm" :key="index">
        <div style="text-align: left">{{ index }}</div>
        <div style="display: flex">
          <div
            v-for="(i, j) in item.ggitem"
            :key="j"
            style="flex: 1"
            @click="selectGg(item,j,index)"
          >
            {{ i }}
          </div>
        </div>
      </div>
      <div v-for="(item, index) in selectNorm.relation" :key="index">
        <div style="text-align: left">{{ index }}</div>
        <div
          style="display: flex"
          v-for="(i, j) in item"
          :key="j"
          class="jj"
          @click="changeGG(i)"
        >
          {{ i.name }}
        </div>
      </div>
      <div>
        <div>数量</div>
        <div>
          <button
            @click="orderSel.order_num--"
            :disabled="orderSel.order_num <= 1"
          >
            -
          </button>
          <input type="text" name value="1" v-model="orderSel.order_num" />
          <button @click="orderSel.order_num++">+</button>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from "components/content/scroll/scroll";
export default {
  name: "detGg",
  data() {
    return {};
  },
  props: {
    selectNorm: {
      type: Object,
      default() {
        return {};
      },
    },
    orderSel: {
      type: Object,
      default() {
        return {};
      },
    },
    num:{
         type: Number,
      default:1,     
    }
  },
  components: {
    scroll,
  },
  computed: {},
  created() {},
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    selectGg(item,j,index) {
      this.num==1?this.$parent.$parent.selectGg( item,j,index):this.$parent.$parent.$parent.selectGg( item,j,index)
    },
    changeGG(item) {
      this.num==1?this.$parent.$parent.changeGG( item):this.$parent.$parent.$parent.changeGG( item)

    },
  },
};
</script>
<style lang='less' scoped>
.jj {
  margin-bottom: 20px;
}
</style>
