<template>
  <div class="selectcont">
    <navbar>
      <div slot="left" @click="historygo(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center" class="tab-center">选择国家或地区</div>
    </navbar>
    <scroll class="contscroll">
      <ul class="contlist">
        <li v-for="(item) in phone_area_code" :key="item.id" @click="historygo(item.area_code)">
          <span>{{item.country}}</span>
          <span>+{{item.area_code}}</span>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar.vue";
import scroll from "components/content/scroll/scroll.vue";
import { AREA_CODE_BACK } from "store/mutation-types";
import { get_mobile_prefix } from "network/user";
export default {
  name: "selectcont",
  data() {
    return {
      phone_area_code: null,
    };
  },
  components: {
    navbar,
    scroll,
  },
  created() {
    //   创建页面的时候，调取国际去哈的数据
    get_mobile_prefix().then((res) => {
      this.phone_area_code = res.data;
    });
  },
  methods: {
    // checkCode(val) {
    //   this.$store.state.area_code = val;
    //   this.$store.commit('BACK');
    // },

    historygo(val) {
      console.log(val)
      if (val > 0) {
        this.$store.commit(AREA_CODE_BACK, val);
      }else{
       if(this.$store.state.areahistory=='/register'){
         this.$store.commit(AREA_CODE_BACK,0)
         return
       }
        this.$store.commit(AREA_CODE_BACK,val)
      }
    },
  },
};
</script>
<style lang='less' scoped>
.navbar {
  display: fixed;
  top: 0;
}
.contlist {
  padding: 0 13px;

  li {
    overflow: hidden;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    span {
      &:first-child {
        float: left;
      }
      &:last-child {
        float: right;
      }
    }
  }
}
.contscroll {
  height: calc(100vh - 49px);
}
</style>
