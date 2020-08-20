<template>
  <div class="msg">
    <navbar>
      <div slot="left" @click="backconf=true">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center" class="tab-center">京东注册</div>
    </navbar>
    <img src="../../../assets/img/msg.png" style="display:block;width:88px;margin:20px auto;" alt />
    <div class="msg3">
      <div>
        <p>我们将以短信或电话的形式将验证码发送给您，请注意接听0575/025/0592/010等开头的电话</p>
        <p>{{phonecode}}</p>
      </div>
      <div style="display:flex;flex-wrap:wrap;">
        <el-input placeholder="请输入手机验证码" v-model="regcode" style="flex:2;" class="msginpput">
          <!-- <el-button @click="getcode"></el-button> -->
        </el-input>
        <div style="flex:2;">
          <el-button type="danger" @click="diamsg=true" :disabled="isdisabled">{{msg}}</el-button>
        </div>
      </div>

      <el-button
        type="danger"
        :disabled="regcode.length>0?false:true"
        round
        style="width:90%;margin:20px auto;"
        @click="next"
      >下一步</el-button>
    </div>
    <el-dialog title :visible.sync="backconf" width="100%">
      <span>点击返回将终端注册，确定返回？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="backconf = false">取消</el-button>
        <el-button @click="$store.commit('BACK')">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title :visible.sync="diamsg" width="100%">
      <span>我们将发送语言验证码至{{phone}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="diamsg = false">取消</el-button>
        <el-button @click="getcode(1)">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar.vue";
import { getcodeimg } from "network/user.js";
export default {
  name: "msg",
  data() {
    return {
      phone: null,
      msg: "发送验证码",
      phonecode: null,
      regcode: "",
      svg: "",
      isdisabled: false,
      diamsg: false,
      backconf:false
    };
  },
  components: {
    navbar,
  },
  created() {
    // 页面创建的时候，先获取到从上个页面传递过来的电话号
    this.phone = JSON.parse(this.$route.params.data).telphone;
    this.getcode(0);
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    getcode(val) {
      if (val == 1) this.diamsg = false;
      this.isdisabled = true;
      getcodeimg({ telphone: this.phone }).then((res) => {
        if (res.code != 200) return;
        this.phonecode = res.str;
      });
      this.timeout();
      this.msg = "重新发送(60)";
    },
    // 创建定时器方法
    timeout() {
      let num = 10;
      let timer = setInterval(() => {
        num--;
        this.msg = "重新发送(" + num + ")";
        if (num == 0) {
          this.msg = "发送验证码";
          clearInterval(timer);
          this.isdisabled = false;
        }
      }, 1000);
    },
    next() {
      if (this.regcode != this.phonecode) return;
      this.$router.push("/setpwd/"+this.$route.params.data);
    },
  },
};
</script>
<style lang='less' >
.msg3 {
  > div {
    padding: 0 13px;
  }
}
.msginpput .el-input__inner {
  border: none;
  outline: none;
  padding: 0;
  font-size: 16px;
}
</style>
