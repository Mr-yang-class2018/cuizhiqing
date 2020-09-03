<template>
  <div id="login">
    <navbar class="home-nav-bar">
      <div slot="left" @click="pushrouper($store.state.loginhistory)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">京东登录注册</div>
    </navbar>

    <div class="login_sty">
      <div class="top">
        <div>
          <div class="tel">
            <router-link to="/selectcont" tag="span" style="line-height:40px;" v-if="show">
              {{area_code}}
              <i class="el-icon-arrow-down"></i>
            </router-link>

            <input type="text" placeholder="用户名/邮箱/手机号" key="user" v-model="phonename" v-if="!show" />
            <input type="text" placeholder="请输入手机号" key="tel" v-if="show" />
          </div>
          <div class="mm">
            <div>
              <input type="text" placeholder="请输入密码" key="pwd" v-model="password" v-if="!show" />
              <input type="text" placeholder="请输入收到的验证码" key="yz" v-if="show" />
            </div>|
            <span v-if="!show">忘记密码</span>
            <span v-if="show">获取验证码</span>
          </div>
          <input type="button" value="登录" @click="loginev" />
          <input type="button" value="一键登录" />
        </div>

        <div class="all">
          <span class="fl" @click="show=!show" v-if="show">账号密码登录</span>
          <span class="fl" @click="show=!show" v-if="!show">短信验证码登录</span>

          <span class="fr" @click="pushrouper('/register')">手机快速注册</span>
        </div>
      </div>
      <div class="bott">
        <p>其他登录方式</p>
        <div>
          <a href>
            <img src="../../assets/img/qq.png" alt />
            <span>QQ</span>
          </a>
          <a href>
            <img src="../../assets/img/chat.png" alt />
            <span>微信</span>
          </a>
          <a href>
            <img src="../../assets/img/apple.png" alt />
            <span>苹果</span>
          </a>
        </div>

        <p v-if="!show">未注册的手机号验证后将自动创建京东账号,</p>
        <p>
          登录及代表你已同意
          <a href>京东隐私政策</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar.vue";
import { land } from "network/user";
import { SET_USERINFO } from "store/mutation-types";

export default {
  name: "login",
  data() {
    return {
      show: true,
      phonename: "",
      password: "",
    };
  },
  components: {
    navbar,
  },
  created() {
    this.fun();
  },
  methods: {
    fun() {
      this.$root.$children[0].page4 = "login";
    },
    loginev() {
      alert('pp')
      land({
        actionKey: "account",
        username: this.phonename,
        password: this.password,
      }).then((res) => {
        console.log(res,this.$store.state.userinfo);
        if (res.code != 200) return console.log(res.msg);

        this.$store.state.userinfo = res.data.user;
        this.$store.state.userinfo.defaddr = res.data.defaddr;
        // 本地存储数据
        this.setlocalstorage(res.data.user.autocode);

        // 更具获取到的登陆吗在重新获取下数据

        this.$store.commit(SET_USERINFO, res);
        //获取购物车数据
        // 因为是异步加兹安数据，所以需要dispatch进行数据分发才会监听数据，数据没有分发到前台，后台变了
        this.$store.dispatch('getshopcart', res.data.user.id);
        this.pushrouper(this.$store.state.loginhistory);
        // autoland({ autocode: res.data.user.autocode }).then((res) => {
        //   console.log(res);
        // });
      });
    },
    setlocalstorage(val) {
      // let key = window.location.origin + "/jd";
      let data = window.localStorage.getItem(this.$store.state.localData);
      if (data != null&&data != undefined&&data != '') {
        data = JSON.parse(data);
      } else {
        data = {};
      }
      data.autocode = val;
      localStorage.setItem(this.$store.state.localData, JSON.stringify(data));
      console.log(window.location.href);
      // val===JSON字符串
    },
  },
  computed: {
    area_code() {
      return this.$store.state.area_code;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/selectcont") this.$store.state.areahistory = from.path;
    if (to.path == "/register") {
      this.$store.state.area_code = 86;
      this.$store.state.contRegister = true;
    }

    next();
  },
};
</script>
<style>
.login_sty {
  padding: 0 20px;
  text-align: left;
  padding-top: 1px;
  height: 92vh;
}
.top {
  height: 56%;
  margin-bottom: 24%;
}
.bott p {
  text-align: center;
}
.bott > div {
  padding: 10px 16%;
  overflow: hidden;
}
.bott > div a {
  float: left;
  width: 48px;
  text-align: center;
  color: #ddd;
}
.bott > div a:nth-child(2) {
  margin: 0 12%;
}
.bott > div img {
  width: 48px;
  height: 48px;
  margin-top: 3px;
  margin-bottom: 2px;
  vertical-align: middle;
}
.bott > div img,
.bott > div span {
  display: inline-block;
}
input[type="text"] {
  border: none;
  outline: none;
  padding: 20px 0;
}
div.tel,
div.mm {
  border-bottom: 1px solid #ddd;
}
div.mm > div {
  width: 60%;
  display: inline-block;
}
div.mm {
  margin-bottom: 20px;
}
div.mm span {
  width: 35%;
  text-align: center;
  display: inline-block;
}

input[type="button"] {
  width: 100%;
  border: none;
  border-radius: 22px;
  padding: 16px 0;
  font-size: 16px;
  background: red;
  color: white;
}
input[type="button"]:last-child {
  background: white;
  color: red;
  border: 1px solid red;
  margin: 16px 0;
}
</style>


