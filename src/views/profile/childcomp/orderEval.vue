<template>
  <div id="orderEval">
    <navbar style="border-bottom:1px solid #ddd;">
      <div slot="left" @click="$router.go(-1)" v-if="show">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="left" @click="rou()" v-if="!show">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center" class="tab-center">评价晒单</div>
      <div slot="right">
        <pagejump></pagejump>
      </div>
    </navbar>
    <div v-if="show">
      <div
        style="display:flex;flex-wrap:wrap;margin-top:10px;"
        v-for="(ii,index) in obj"
        :key="index"
      >
        <div class="listimg">
          <img :src="$store.state.path+'/goods/'+ii.img_cover" alt />
        </div>
        <div class="cardet" style="flex:5;" v-on:click="todetails('/details/'+ii.goods_id)">
          <div>{{ii.goods_name}}</div>
        </div>
        <el-button type="default" round @click="ggg(ii)">{{ii.state=='配送中'?'查看评价':'填写评价'}}</el-button>
      </div>
    </div>

    <div v-if="!show">
      <div style="border-bottom:1px solid #ddd;display:flex;flex-wrap:wrap;" class="header_shop">
        <img :src="$store.state.path+'/goods/'+obj.img" alt />
        <span style="flex:2;">商品评分</span>
        <div style="flex:5;text-align:left;">
          <span class="el-icon-star-off" v-for="i in [1,2,3,4,5]" :key="i" @click='changeColor'></span>
        </div>
      </div>
      <textarea name id cols="30" rows="10" placeholder="评价大于20元的商品超过10个字就有机会获得金豆"></textarea>
    </div>

    <div>
      <div style="text-align:left;">
        <p>物流服务评价</p>
        <span>评价大于200元的订单可获得金豆（订单完成三个月内有效）</span>
      </div>
      <div class="searve">
        <div v-for="i in ['快递包装','送货速度','配送员服务']" :key="i">
          <i>{{i}}</i>
          <div style="flex:5;">
            <span class="el-icon-star-off" v-for="i in [1,2,3,4,5]" :key="i" @click="changeColor()"></span>
          </div>
        </div>
      </div>
    </div>
    <el-button round type="danger" style="width:100%;margin-top:20px;">提交</el-button>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar";
import pagejump from "components/common/pageJump/pageJump";
export default {
  name: "orderEval",
  data() {
    return {
      obj: null,
      show: true,
    };
  },
  components: {
    navbar,
    pagejump,
  },
  computed: {},
  created() {
    // console.log(this)
    this.getParams();
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    changeColor() {
      var e = e || event;
      e.target.style.color = "yellow";
    },
    rou() {
      this.$router.go(-1);
      setTimeout(() => {
        this.getParams();
      }, 500);
    },
    ggg(ii) {
      let iii = { img: ii.img_cover };
      this.pushrouper("/orderEval/" + JSON.stringify(iii));
      this.getParams();
    },
    getParams() {
      this.obj = JSON.parse(this.$route.params.obj);
      console.log(this.obj);
      if (Array.isArray(this.obj)) {
        this.show = true;
      } else {
        this.show = false;
      }
      document.querySelectorAll('.searve span').forEach((item)=>{
        item.style.color='gray'
      })
    },
  },
};
</script>
<style lang='less' scoped>
.searve {
  text-align: left;
  > div {
    padding: 5px 0;
    display: flex;
    flex-wrap: wrap;
    i {
      flex: 2;
    }
  }
}
.header_shop {
  overflow: hidden;
  img {
    width: 20%;
    float: left;
  }
}
textarea {
  width: 98%;
  padding: 0;
}
</style>
