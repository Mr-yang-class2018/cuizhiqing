<template>
  <div id="detbar">
    <div class="leftdet">
      <div>
        <div>
          <img src="../../../assets/img/kf.png" alt />
        </div>

        <div>客服</div>
      </div>
      <div>
        <div>
          <img src="../../../assets/img/dp.png" alt />
        </div>

        <div>店铺</div>
      </div>
      <div>
        <div>
          <img src="../../../assets/img/gwc.png" alt />
        </div>
        <div @click="tocart()">购物车</div>
        <i
          style="
            position: absolute;
            top: 0;
            right: 0;
            width: 16px;
            height: 16px;
            color: red;
            font-size: 12px;
            text-align: center;
            border: 1px solid red;
            border-radius: 50%;
          "
          >{{ shopcartlength }}</i
        >
      </div>
    </div>
    <div class="rightdet">
      <div @click="dialogVisible = true">
        <!-- <el-button type="text" @click="dialogVisible = true">加入购物车</el-button> -->
        <el-button type="text">加入购物车</el-button>
      </div>
      <div @click="dialogVisiblee = true">
        <span>立即购买</span>
      </div>
    </div>
    <el-dialog title="加入购物车" :visible.sync="dialogVisible" class="sss">
      <det-gg :selectNorm="selectNorm" :orderSel="orderSel" :num='2'></det-gg>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addshop">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提交订单" :visible.sync="dialogVisiblee" class="sss">
      <det-gg :selectNorm="selectNorm" :orderSel="orderSel" :num='2'></det-gg>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addorder">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import detGg from "components/common/detGg/detgg";

export default {
  name: "detbar",
  data() {
    return {
      strt: "",
      dialogVisible: false,
      dialogVisiblee: false,
    };
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
  },
  computed: {
    userinfo() {
      return this.$store.state.userinfo;
    },
    shopcartlength() {
      return this.$store.state.shopcartlength;
    },
    user() {
      return (
        this.userinfo != "" &&
        this.userinfo != null &&
        this.userinfo != undefined
      );
    },
  },
  created() {
    if (this.user && this.shopcartlength == 0) {
      this.$store.dispatch("getshopcart", this.$store.state.userinfo);
    }
  },
  components: {
    detGg,
  },
  methods: {
    addshop() {
      this.dialogVisible = false;
      this.$parent.addshop();
    },
    addorder() {
      this.$parent.addorder();
    },
    tocart() {
      this.$router.push("/cart");
    },
  },
};
</script>
<style lang='less'>
#detbar {
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  .leftdet,
  .rightdet {
    flex: 1;
    display: flex;
    > div {
      flex: 1;
      height: 49px;
      width: 92%;
      font-size: 12px;
      text-align: center;
      margin-right: 3%;
      position: relative;
      img {
        width: 24px;
        height: 24px;
        margin-top: 3px;
        margin-bottom: 2px;
        vertical-align: middle;
      }
    }
  }
  .rightdet > div {
    height: 80%;
    border-radius: 21px;
    background: yellow;
    color: white;
    margin-top: 3%;
    span {
      position: absolute;
      top: 30%;
      left: 3%;
    }
  }
  .rightdet > div:nth-child(2) {
    background: red;
    span {
      left: 17%;
    }
  }
  /* ----------------- */
  .el-dialog 
    .el-dialog__footer
      .el-button {
        width: 100%;
        background-color: #f56c6c !important;
        border-color: #f56c6c !important;
        border-radius: 20px !important;
      }
    
}
</style>