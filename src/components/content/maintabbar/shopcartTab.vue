<template>
  <div id="shopcartab">
    <div class="shopcaritem">
      <!-- <span class="gou" :class="ghgh==true ? 'gouactive':''" @click="gougou($event)"></span> -->
      <el-checkbox
        @change="gougou"
        v-model="checkAll"
      >全选{{ this.$store.state.checkedCities.length==this.$store.state.shopcargoodsnum}}</el-checkbox>

     
    </div>

    <div class="shopcaritem" style="text-align:right;">
      <div v-if="bji">
        总计:
        <span>{{this.$store.state.totalpayment}}</span>
      </div>

      <div v-if="!bji">移至收藏</div>
    </div>
    <div class="shopcaritem" @click="$emit('payment')" v-if="bji">
      <!-- <button class="js" disabled>去结算({{$store.state.totalnum}}件)</button> -->
      <!-- <input class="js" type="button" :disabled='paymentgoods.length==0' :value="'去结算('+$store.state.totalnum+'件)'" :class="{disabled:paymentgoods.length==0}"> -->
      <input
        class="js"
        type="button"
        :disabled="$store.state.totalnum==0"
        :value="'去结算('+$store.state.totalnum+'件)'"
        :class="{disabled:$store.state.totalnum==0}"
      />
      {{$store.state.checkedCities.length}}{{$store.state.shopcargoodsnum}}
    </div>

    <div class="shopcaritem" v-if="!bji">删除</div>
  </div>
</template>

<script>
export default {
  name: "shopcartab",
  props: {
    bji: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      checkAll:null,
    };
  },
  components: {},
  created() {
    if(this.$store.state.checkedCities.length ==
        this.$store.state.shopcargoodsnum){
this.checkAll=true
    }else{
this.checkAll=false

    }
    
    console.log(this.paymentgoods);
  },
  activated() {},
  deactivated() {},
  mounted() {},
  computed: {
    paymentgoods() {
      return this.$store.state.paymentgoods;
    },
  },
  methods: {
    gougou(val) {
      this.$emit("hhh", val);
      this.$emit("totalmoney");
    },
    goorder() {
      // this.$router.push('/')
      // this.$emit("confirm_goods");
      // this.$emit('payment');
    }
  }
};
</script>
<style lang='less'>
#shopcartab {
  display: flex;
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  background: white;
  .shopcaritem {
    line-height: 49px;
    font-size: 14px;
    text-align: center;
    overflow: hidden;
    &:not(:first-child) {
      flex: 1;
    }
    .js {
      padding: 8px 0;
      width: 80%;
      text-align: center;
      background: red;
      border-radius: 20px;
      color: white;
    }
    input.disabled {
      background: rgba(255, 0, 0, 0.5);
    }
  }
}
.gou {
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
  margin-right: 8px;
  background-position: -6px -36px;
  background-image: url("../../../assets/img/gou.png");
  background-size: 130px 105px;
}

.gou.gouactive {
  background-position: -37px -111px;
}
</style>
