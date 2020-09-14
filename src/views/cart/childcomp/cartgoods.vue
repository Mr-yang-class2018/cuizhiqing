<template>
  <div class="shopcarlist" ref="shopcarlist">
    <div class="shopname">
      <div style="text-align:left;padding:10px 0;">
        <!-- <span class="gou" @click="shopgou(index,key)"></span> -->
        <!-- <el-checkbox @change="shopgou()"></el-checkbox> -->
       <el-checkbox-group v-model="$store.state.checkedCities" @change="shopgou(index)">
          <el-checkbox :label="shopname" :key="shopname"></el-checkbox>
        </el-checkbox-group> 
      </div>
    </div>
    <div v-for="(list,index) in goods" :key="index" class="shopcardet" ref="shopcardet">
      <div>
        <!-- <span class="gou" :class="list.ischeck=='1' ? 'gouactive':''" @click="checkobj(list,item)"></span> -->

        <!-- <el-checkbox @change="checkobj" :model="list.ischeck=='1'"></el-checkbox> -->
        <el-checkbox-group v-model="indexArr" @change="checkobj">
          <el-checkbox :label="list.goods_id"></el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="listimg">
        <img :src="$store.state.path+'/goods/'+list.img_cover" alt />
      </div>
      <div class="cardet" v-on:click="pushrouper('/details/'+list.goods_id)">
        <div>{{list.goods_name}}</div>
        <div class="norm-box" v-on:click.stop="selectnorm(list)" style="font-size:12px;">
          <p class="norm">
            <em
              style="width: 90px;display: inline-block;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
            >{{list.goods_name}}</em>
            <span>
              ,选服务
              <i class="el-icon-arrow-down"></i>
            </span>
          </p>
        </div>
        <div>
          <span>{{list.money_now}}</span>
          <div>
            <strong v-on:click.stop="jj(list,'-',index)">-</strong>
            <input
              type="text"
              v-model="list.num"
              style="width:18px;height:18px;text-align:center;"
              v-on:click.stop
            />
            <strong v-on:click.stop="jj(list,'+',index)">+</strong>
          </div>
        </div>
        <div style="text-align:right;" v-on:click.stop="deleteshop(list.id)">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
import { deletshopcart } from "network/shopcar";
export default {
  name: "cartgoods",
  data() {
    return {
      indexArr: []
    };
  },
  props: {
    shopname: {
      type: String,
      default: ""
    },
    index: {
      type: Number,
      default: null
    },
    localShopCart: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  computed: {
    name() {
      return this.shopname;
    },
    goods() {
     let goods= this.$store.state.userinfo?this.$store.state.shopcart[this.name]:this.localShopCart[this.name]
      return goods;
    },
    shopCartNameArr() {
      return this.$store.state.shopCartNameArr;
    },
    paymentgoods() {
      return this.$store.state.paymentgoods;
    }
  },
  created() {
    this.goods.forEach(item => {
      if (item.ischeck == "1") {
        this.indexArr.push(item.goods_id);
      }
    });
    console.log(this.indexArr);
    console.log(this.$store.state.checkedCities);
  },
  methods: {
    deleteshop(shopid) {
      console.log(shopid);
      deletshopcart({ id: shopid }).then(res => {
        console.log(res);
      });
    },
    checkobj(val) {
      var e = e || event;
      if (val.length == this.goods.length) {
        this.$store.state.checkedCities.push(this.name);
      } else {
        let a = this.$store.state.checkedCities.indexOf(this.name);
        if (a != -1) {
          this.$store.state.checkedCities.splice(a, 1);
        }
      }
      this.goods.forEach(item => {
        if (this.indexArr.indexOf(item.goods_id) == -1) {
          //添加选中
          item.ischeck = "0";
          //加支付总价
        } else {
          item.ischeck = "1";
        }
      });
      this.$emit("totalmoney");
    },
    shopgou(index) {
      this.indexArr = [];
      let a = this.$store.state.checkedCities.indexOf(
        this.shopCartNameArr[index]
      );
      let arr = this.$store.state.shopcart[this.shopCartNameArr[index]];
      if (a != -1) {
        arr.forEach(item => {
          if (this.indexArr.indexOf(item.goods_id) == -1) {
            //添加选中
            this.indexArr.push(item.goods_id);
            //加支付总价
          }
          item.ischeck = "1";
        });
      } else {
        this.indexArr = [];
        arr.forEach(item => {
          item.ischeck = "0";
        });
      }
      this.$emit("totalmoney");
    },
    jj(list, val, index) {
      var e = e || event;
      switch (val) {
        case "-":
          if (list.num > 1) {
            e.target.nextElementSibling.value = list.num * 1 - 1;
            list.num = list.num * 1 - 1;
          }
          break;
        case "+":
          e.target.previousElementSibling.value = list.num * 1 + 1;
          list.num = list.num * 1 + 1;
          break;
      }
      this.$store.state.shopcart[this.name][index].ischeck = "1";
      let a = this.indexArr.indexOf(list.goods_id);
      if (a == -1) {
        this.indexArr.push(list.goods_id);
      }
      let aa = this.$store.state.checkedCities.indexOf(this.name);
      if (this.indexArr.length == this.goods.length && aa == -1) {
        this.$store.state.checkedCities.push(this.name);
      }
      this.$emit("totalmoney");
    }
  }
};
</script>
<style lang='less'>
.shopcarlist {
  padding: 0 15px 0 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  .shopcardet {
    padding: 10px 0 10px 5px;
    display: flex;
    flex-wrap: wrap;
    &:not(:last-child) {
      border-bottom: 1px solid #ddd;
    }
    > div {
      float: left;
    }
    > div:nth-child(3) {
      flex: 1;
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
    .cardet {
      > div:nth-child(3) {
        overflow: hidden;
        span {
          float: left;
        }
        > div {
          float: right;
        }
        strong {
          width: 16px;
          height: 16px;
          text-align: center;
          :nth-child(2) {
            padding: 0 3px;
          }
        }
      }
    }
  }
  .gou {
    margin-top: 100%;
    margin-left: 0;
  }
  .shopname .gou {
    margin-top: 0;
  }
  .shopcardet {
    .el-checkbox__label {
      display: none;
    }
  }
}
</style>
