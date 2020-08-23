<template>
  <div id="registered">
    <navbar>
      <div slot="left" @click="backred=true">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center" class="tab-center">京东注册</div>
    </navbar>
    <div class="bottomreg">
      <img
        src="~/assets/img/jd_logo2.png"
        style="width:90px;height:90px;border:2px solid #ddd;border-radius:50%;margin-top:20px;"
        alt
      />
      <p>{{name | changeTel}}</p>
      <p>该手机号已经帮顶以上京东账号，请确定是你的账号</p>
      <el-button type="danger" round @click="pushrouper('/login')">是我的，立即登录</el-button>
      <el-button
        type="default"
        round
        @click="jumpmsg()"
      >不是我的，继续注册</el-button>
    </div>
    <el-dialog title :visible.sync="backred" width="100%">
      <span>点击返回将终端注册，确定返回？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="backred = false">取消</el-button>
        <el-button @click="$store.commit('BACK')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar.vue";
export default {
  name: "registered",
  data() {
    return {
      name: {},
      backred: false,
      area_code: null,
      phone: null,
    };
  },
  components: {
    navbar,
  },
  created() {
    this.msgall = JSON.parse(this.$route.params.user);
    this.name = this.msgall.name;
    this.area_code = this.msgall.area_code;
    this.phone = this.msgall.tel;
    
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    jumpmsg(){
      let data = {};
    data.areacode = this.area_code;
    data.telphone = this.phone;
    
    console.log(data)
      this.$router.push("/msg/"+JSON.stringify(data))
    }
  },
  filters: {
    changeTel(val) {
      return val.replace(/^(\w{1})\w+(\w{1})$/, "$1****$2");
    },
  },
};
</script>
<style lang='less'>
#registered {
  input {
    width: 96%;
    margin: 10px 2%;
    height: 50px;
    font-size: 20px;
    border-radius: 25px;
    border: none;
    outline: none;
  }
  h2 {
    margin-bottom: 20px;
  }
  .bottomreg {
    padding: 0 14px;
  }
  .el-button {
    width: 100%;
  }
  .el-button--danger {
    margin-top: 3rem;
  }
  .el-button + .el-button {
    margin-left: 0;
    margin-top: 1rem;
  }
}
</style>
