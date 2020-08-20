<template>
  <div class="myorder">
    <scroll ref="myordercroll" class="myordercroll">
      <navbar style="border-bottom:1px solid #ddd;">
        <div slot="left" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center" class="tab-center">我的订单</div>
        <div slot="right">
          <pagejump></pagejump>
        </div>
      </navbar>
      <div style="border-bottom:1px solid #ddd;overflow:hidden;" class="allsearch">
        <div class="searchall" :style="dialogVisible?{width:'70%'}:{width:'90%'}">
          <i class="el-icon-search" style="margin:0 8px;"></i>
          <el-button type="text" @click="dialogVisiblehhh(1)">
            <input
              type="text"
              style="border:none;background:#f7f7f7;outline:none;padding:5px 0;color:#ddd;"
              value="商品名称/商品编号/订单号"
            />
          </el-button>
          <el-dialog :visible.sync="dialogVisible" width="0" :show-close="false"></el-dialog>
        </div>
        <el-button @click="dialogVisible = false" v-if="dialogVisible">取 消</el-button>
      </div>
      <div class="catestate">
        <ul>
          <li @click="ggg('all')" :class="num=='all'?'active':null">全部</li>
          <li @click="ggg(1)" :class="num==1?'active':null">代付款</li>
          <li @click="ggg(2)" :class="num==2?'active':null">待收货</li>
          <li @click="ggg(3)" :class="num==3?'active':null">已完成</li>
        </ul>
        <p>
          <span>|</span>
        </p>
        <div>
          <el-button type="text" @click="dialogVisiblehhh(2)" class="el-icon-arrow-down"></el-button>
          <el-dialog title="提示" :visible.sync="dialogVisible1" width="100%" top="8vh">
            <span>这是一段信息</span>
          </el-dialog>
        </div>
      </div>
      <div v-for="(i,index) in shop" :key="index" style="margin:10px;padding:10px;">
        <div style="text-align:left;">
          {{i.shop_name}}
          <i style="overflow:hidden;float:right;width:50px;height:20px;">{{i.state}}</i>
        </div>
        <div style="display:flex;flex-wrap:wrap;margin-top:10px;">
          <div class="listimg">
            <img :src="$store.state.path+'/goods/'+i.img_cover" alt />
          </div>
          <div class="cardet" style="flex:5;" v-on:click="todetails('/details/'+i.goods_id)">
            <div>{{i.goods_name}}</div>
            <div>
              <span>{{i.money_now*i.num}}</span>
            </div>
          </div>
        </div>
        <div style="text-align:right;overflow:hidden;">
                 {{i.state=='待支付'?'去支付':''}}
        </div>
      </div>

      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque inventore sint consequatur nesciunt ipsum? Enim, quod. Ea temporibus provident quibusdam ullam, sit eaque nostrum blanditiis minus cupiditate voluptatum quas eum.</div>
    </scroll>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar";
import scroll from "components/content/scroll/scroll";
import { userorderall, getorderbyorderid } from "network/order";
import pagejump from "components/common/pageJump/pageJump";

export default {
  name: "myorder",
  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      shop: [],
      num: 1,
      state: null,
    };
  },
  components: {
    navbar,
    scroll,
    pagejump
  },
  created() {},
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    dialogVisiblehhh(ele) {
      var ff;
      if (ele == 1) {
        this.dialogVisible = true;
        ff = "1000";
      } else {
        this.dialogVisible1 = !this.dialogVisible1;
        ff = "2005";
      }
      document.querySelector(
        ".catestate .el-button.el-icon-arrow-down.el-button--text"
      ).style.zIndex = ff;
      document.querySelector(".catestate > ul").style.zIndex = ff;
      document.querySelector(".catestate > p").style.zIndex = ff;
    },
    ggg(index) {
      this.shop = [];
      this.num = index;
      var state;
      if (index == "all") {
        [1, 2, 3].forEach((list) => {
          userorderall({
            user_id: this.$store.state.userinfo.id,
            state: list,
          }).then((res) => {
            res.data.forEach((item) => {
              getorderbyorderid(item.id).then((res) => {
                state = list == 1 ? "待支付" : null;
                res.data[0]["state"] = state;
                this.shop.push(res.data[0]);
                console.log(this.shop);
              });
            });
          });
        });
      } else {
        userorderall({
          user_id: this.$store.state.userinfo.id,
          state: this.num,
        }).then((res) => {
          console.log(res.data);
          res.data.forEach((item) => {
            getorderbyorderid(item.id).then((res) => {
              state = index == 1 ? "待支付" : null;
              res.data[0]["state"] = state;
              this.shop.push(res.data[0]);
            });
          });
        });
      }
    },
  },
};
</script>
<style lang='less'>
.allsearch {
  .searchall {
    margin: 9px 5px 9px 12px;
    background: #f7f7f7;
    border-radius: 10px;
    text-align: left;
    float: left;
  }
  .el-dialog__body {
    margin: -12px 50px;
  }
  .el-button.el-button--text {
    padding: 0;
  }
  .el-button.el-button--default {
    margin-top: 8px;
    padding: 6px 10px;
  }
}
.active {
  border-bottom: 1px solid blue;
}
.listimg {
  // flex:2;
  width: 86px;
  height: 86px;
  img {
    width: 100%;
    height: 100%;
  }
}
.catestate {
  display: flex;
  flex-wrap: wrap;
  //   padding: 10px 0;

  > div {
    flex: 1;
    background: white;
  }
  > ul {
    flex: 6;
    display: flex;
    flex-wrap: wrap;

    li {
      flex: 1;
    }
  }
  > p {
    padding-top: 20px;
  }
  > p,
  > ul {
    background: white;
    position: relative;
    padding: 10px 0;
  }
  p {
    margin: 0;
  }
  .el-button.el-icon-arrow-down.el-button--text {
    padding: 13px;
    color: #ddd;
    width: 100%;
    position: relative;
    background: white;
    border-radius: 0px;
    border-bottom-right-radius: 4px;
  }
}
.myordercroll {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  float: left;
}
.el-dialog__wrapper,
.v-modal {
  top: 16%;
}
</style>
