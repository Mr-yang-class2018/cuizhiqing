<template>
  <div class="setpwd">
    <navbar>
      <div slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center" class="tab-center">京东注册</div>
    </navbar>
    <div class="content">
      <p>请输入用户密码</p>
      <el-input placeholder="请输入密码" v-model="pwd" style="flex:2;" class="msginpput" show-password></el-input>
      <el-button
        type="danger"
        round
        style="width:90%;margin:20px auto;"
        @click="submit"
        :disabled="issubmit"
      >提交</el-button>
    </div>
    {{$route.params.data}}
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar.vue";
import { register} from "network/user";
export default {
  name: "setpwd",
  data() {
    return {
      pwd: "",
      issubmit: true,
      msg: "",
    };
  },
  watch: {
    pwd(val) {
      let reg = /^[a-zA-Z][\w]{6,12}$/;
      if (reg.test(val)) {
        this.issubmit = false;
        this.msg = "密码可用";
      } else {
        this.issubmit = true;
        this.msg = "";
      }
    },
  },
  components: {
    navbar,
  },
  created() {},
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    submit() {
      let data = JSON.parse(this.$route.params.data);
      data.password = this.pwd;
      console.log(data);
      //     向服务器提交请求
      register(data).then((res) => {
        console.log(res);
              if(res.code!=200) return console.log('网络连接错误/数据库连接有误')
              this.pushrouper('/login')
      });

      
    },
  },
};
</script>
<style lang='scss' scoped>
</style>
