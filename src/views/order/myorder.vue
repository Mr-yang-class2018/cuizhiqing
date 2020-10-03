<template>
  <div class="myorder" v-if="nn">
    <scroll ref="myordercroll" class="myordercroll">
      <navbar style="border-bottom: 1px solid #ddd">
        <div slot="left" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center" class="tab-center">我的订单</div>
        <div slot="right">
          <pagejump></pagejump>
        </div>
      </navbar>
      <div
        style="border-bottom: 1px solid #ddd; overflow: hidden"
        class="allsearch"
      >
        <div
          class="searchall"
          :style="dialogVisible ? { width: '70%' } : { width: '90%' }"
        >
          <i class="el-icon-search" style="margin: 0 8px"></i>
          <el-button type="text" @click="dialogVisiblehhh(1)">
            <input
              type="text"
              style="
                border: none;
                background: #f7f7f7;
                outline: none;
                padding: 5px 0;
                color: #ddd;
              "
              value="商品名称/商品编号/订单号"
            />
          </el-button>
          <el-dialog
            :visible.sync="dialogVisible"
            width="0"
            :show-close="false"
          ></el-dialog>
        </div>
        <el-button @click="dialogVisible = false" v-if="dialogVisible"
          >取 消</el-button
        >
      </div>
      <div class="catestate">
        <ul>
          <li
            v-for="(item, index) in arrList"
            :key="index"
            @click="ggg(index)"
            :class="num == index ? 'active' : null"
          >
            {{ item }}
          </li>
        </ul>
        <p>
          <span>|</span>
        </p>
        <div>
          <el-button
            type="text"
            @click="dialogVisiblehhh(2)"
            class="el-icon-arrow-down"
          ></el-button>
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible1"
            width="100%"
            top="1vh"
          >
            <span>这是一段信息</span>
          </el-dialog>
        </div>
      </div>

      <div
        v-for="(i, item, index) in shop1"
        :key="index"
        style="margin: 10px; padding: 10px"
      >
        <div style="text-align: left">
          {{ item }}
          <p style="overflow: hidden; float: right; height: 20px">
            <span>{{ i[0].state }}</span>
            <span v-if="i[0].state != '配送中' && i[0].state != '已完成'"
              >|</span
            >
            <span
              v-if="i[0].state != '配送中' && i[0].state != '已完成'"
              class="el-icon-delete"
            ></span>
          </p>
        </div>
        <div
          style="display: flex; flex-wrap: wrap; margin-top: 10px"
          v-for="(ii, index) in i"
          :key="index"
        >
          <div class="listimg">
            <img :src="$store.state.path + '/goods/' + ii.img_cover" alt />
          </div>
          <div
            class="cardet"
            style="flex: 5"
            v-on:click="todetails('/details/' + ii.goods_id)"
          >
            <div>{{ ii.goods_name }}</div>
            <div>
              <span>{{ ii.money_now * ii.num }}</span>
            </div>
          </div>
        </div>
        <div
          style="
            text-align: right;
            overflow: hidden;
            margin-top: 10px;
            border-top: 1px solid #ddd;
          "
        >
          <span v-if="i[0].state == '待支付'">支付剩余</span>
          <el-button
            type="default"
            round
            v-if="i[0].state == '配送中'"
            @click="pushrouper('/orderEval/' + JSON.stringify(i))"
            >我要催单</el-button
          >
          <el-button
            type="default"
            round
            v-if="i[0].state == '配送中'"
            @click="pushrouper('/orderEval/' + JSON.stringify(i))"
            >再次购买</el-button
          >
          <el-button
            type="default"
            round
            v-if="i[0].state == '配送中'"
            @click="pushrouper('/orderEval/' + JSON.stringify(i))"
            >确认收货</el-button
          >
          <el-button
            type="default"
            round
            v-if="i[0].state == '已签收'"
            @click="pushrouper('/orderEval/' + JSON.stringify(i))"
            >去评价</el-button
          >
          <el-button
            type="default"
            round
            v-if="i[0].state == '已签收' || i[0].state == '已取消'"
            >再次购买</el-button
          >
          <el-button type="default" round v-if="i[0].state == '已取消'"
            >看相似</el-button
          >
          <el-button
            type="default"
            round
            v-if="i[0].state == '待支付'"
            @click="pushrouper('/orderEval/' + JSON.stringify(i))"
            >去支付</el-button
          >
        </div>
      </div>
    </scroll>
  </div>
</template>
appendChild
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
      shop1: {},
      nn: false,
      num: null,
      arrList: ["全部", "代付款", "待收货", "已完成"],
    };
  },
  components: {
    navbar,
    scroll,
    pagejump,
  },
  created() {
    setTimeout(() => {
      this.nn = true;
    }, 500);
    this.num = this.$route.params.index;
    this.ggg(this.$route.params.index);
  },
  beforeRouteleave(to, from, next) {
    console.log(to, from);
    this.shop = [];
    next();
  },
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
      if (index == 0) {
        [1, 2, 3].forEach((list) => {
          userorderall({
            user_id: this.$store.state.userinfo.id,
            state: list,
          }).then((ress) => {
            this.aaa(ress.data);
            console.log(this.shop)
          });
        });
      } else {
        userorderall({
          user_id: this.$store.state.userinfo.id,
          state: this.num,
        }).then((ress) => {
          this.aaa(ress.data,index);
        });
      }
    },
    aaa(list,index) {
      let state1;
      list.forEach((item) => {
        getorderbyorderid(item.id).then((res) => {
          state1 =
            index == 3
              ? "已完成"
              : (state1 =
                  index == 2
                    ? "配送中"
                    : (state1 = index == 1 ? "待支付" : "已取消"));
          res.data[0]["state"] = state1;
          this.shop.push(res.data[0]);
          this.totall();
        });
      });
    },
    totall() {
      let shop1 = null;
      let num = 0;
      console.log(this.shop);
      this.shop.forEach((item) => {
        console.log(item);
        if (shop1 == null) {
          shop1 = {};
          shop1[item.shop_name] = [];
          shop1[item.shop_name].push(item);
        } else {
          for (let g in shop1) {
            console.log(item.state, shop1[g]);
            if (g == item.shop_name) {
              shop1[g].forEach((list) => {
                if (item.state == list.state) {
                  shop1[item.shop_name].push(item);
                }
              });
            } else {
              num++;
              if (num == shop1[g].length) {
                shop1[item.shop_name] = [];
                shop1[item.shop_name].push(item);
              }
            }
          }
        }
      });
      this.shop1 = shop1;
      console.log(this.shop1);
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
