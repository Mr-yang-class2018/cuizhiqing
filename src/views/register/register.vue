<template>
  <div class="register">
    <navbar>
      <div slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center" class="tab-center">京东注册</div>
    </navbar>
    <div>
      <div class="tel" style="display:flex;flex-wrap:wrap;">
        <router-link to="/selectcont" tag="span" style="line-height:40px;">
          {{area_code}}
          <i class="el-icon-arrow-down"></i>
        </router-link>

        <!-- <input
          type="text"
          placeholder="请输入手机号"
          v-model="hhh"
          key="tel"
          @focus="cha=true"
        />-->

        <!-- <span :v-model="region" @click='changeregin'>
          <el-select v-model="area_code" placeholder="请选择">

            <el-option>

            </el-option>

          </el-select>
        </span>-->

        <el-input v-model="phone" placeholder="请输入手机号" style="width:60%;"></el-input>

        <!-- <span
          :style="cha==false?{display:'none'}:{display:'block'}"
          @click="hhhnull()"
          class="cha"
        >×</span>-->
      </div>
    </div>

    <!-- <el-button type="danger" :disabled="gg==true" round style="width:92%;margin-top:10vh;">下一步</el-button> -->

    <el-button
      type="danger"
      :disabled="regtel"
      @click="next"
      round
      style="margin-top:30px;width:90%;"
    >下一步</el-button>

    <el-dialog title="注册协议及隐私政策" :visible.sync="$store.state.contRegister" width="100%">
      <span>
        在您注册成为京东用户的过程中，您需要完成我们的注册流程并通过点击同意的形式在线签署以下协议，
        请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）：
        点击同意即表示您已阅读并同意
        《京东用户注册协议》《京东隐私政策》
        并将您的订单信息共享给为完成此订单所必须的第三方合作方。关于
        《订单共享与安全》
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$store.commit('BACK')">取 消</el-button>
        <el-button type="primary" @click="$store.state.contRegister = false">同意</el-button>
      </span>
    </el-dialog>

    <el-dialog title :visible.sync="dialogVisible1" width="100%">
      <span>我们将发送语言验证码至{{phone}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible1 = false">取消</el-button>
        <el-button @click="warningok">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar.vue";
import { regphone } from "network/user";

export default {
  name: "register",
  data() {
    return {
      // cha: false,
      // gg: true,
      // hhh: null,
      // show: this.$store.state.contRegister,
      dialogVisible1: false,
      // region: "",
      phone: "",
      phone_area_code: null, //国际区号
      regtel: true,
      // area_code:100
    };
  },
  watch: {
    // hhh(val) {
    //   if (/^1[3456789]\d{9}$/.test(val)) {
    //     alert("手机号码正确");
    //     this.gg = false;
    //   }
    //   console.log(val);
    // },

    phone(val) {
      let pattern = /^0?(13|14|15|17|18)[0-9]{9}$/;
      this.regtel = pattern.test(val) ? false : true;
      console.log(this.regtel);
    },
  },
  components: {
    navbar,
  },
  beforeRouteLeave(to, from, next) {
    this.$store.state.contRegister = true;
    if (to.path == "/selectcont") this.$store.state.areahistory = from.path;
    next();
  },
  created() {
    console.log(this.$route.params.data);
    // if (this.$route.params.data != 0) {
    //   this.show = false;
    //   // this.area_code=this.$route.params.code
    // }

    // else{
    //   this.area_code='86'
    // }
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    // hhhnull() {
    //   this.hhh = null;
    //   console.log(this.hhh);
    // },
    warningok() {
      let data = {};
      data.areacode = this.area_code;
      data.telphone = this.phone;
      this.$router.push("/msg/" + JSON.stringify(data));
    },
    next() {
      var data = {
        telphone: this.phone,
      };
      regphone(data).then((res) => {
        if (res.code == 500) {
          // 把用户注册的事件提取出来，转换成事件格式
          let createTime = new Date(res.data.createtime);
          let newDate = new Date();
          let difference = newDate.getTime() - createTime.getTime();
          console.log(createTime,newDate)
          if (difference > 30 * 24 * 60 * 60 * 1000) {
            // 跳转页面，把res.data传过去
            console.log(res.data)
            this.$router.push("/reRegiste/" + JSON.stringify(res.data));
            return;
          }
          alert("该手机号已经被其他张哈绑定，30天内不可改绑");
          return;
        }

        // 确认框
        // 确认 跳转页面 取消 不跳转

        // 跳转短信页面，如果不是500
        this.dialogVisible1 = true;
        // this.$router.push("/msg/" + JSON.stringify(data));
      });
    },
  },
  computed: {
    area_code() {
      return this.$store.state.area_code;
      // return this.phone_area_code ? this.phone_area_code[0] : "86";
    },
    show() {
      return this.$store.state.contRegister;
    },

    // regtel() {
    //   //计算正则验证电话号的结果
    //   return /^0?(13|14|15|17|18)[0-9]{9}$/.test(this.phone);
    // },
  },
  // filters: {
  //   regphone(val) {
  //     let pattern = /^0?(13|14|15|17|18)[0-9]{9}$/;
  //     return pattern.test(val);
  //   },
  // },
};
</script>
<style lang='less'>
.register {
  .tel {
    padding: 20px 0 10px;
    margin: 0 26px;
    border-bottom: 1px solid #f7f7f7;
    input {
      border: none;
      padding: 0;
      &:focus {
        outline: none;
        outline-offset: 0px;
      }
    }
    .cha {
      flex: 1;
    }
  }
}
</style>
