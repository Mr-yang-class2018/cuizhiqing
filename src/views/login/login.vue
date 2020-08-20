<template>
  <div id="login">
    <navbar class="home-nav-bar">
      <a href="/home" slot="left">&lt;</a>
      <div slot="center">京东登录注册</div>
    </navbar>

    <div class="login_sty">
      <div class="top">
        <div>
          <div class="tel">
            <span v-if="!show">+86</span>
            &nbsp;&nbsp;
            <i class="el-icon-arrow-down" v-if="!show"></i>
            &nbsp;&nbsp;
            <input
              type="text"
              placeholder="用户名/邮箱/手机号"
              key="user"
              v-if="show"
            />
            <input type="text" placeholder="请输入手机号" key="tel" v-if="!show" />
          </div>
          <div class="mm">
            <div>
              <input type="text" placeholder="请输入密码" key="pwd" v-if="show" />
              <input type="text" placeholder="请输入收到的验证码" key="yz" v-if="!show" />
            </div>|
            <span v-if="show">忘记密码</span>
            <span v-if="!show">获取验证码</span>
          </div>
          <input type="button" value="登录" />
          <input type="button" value="一键登录" />
        </div>

        <div class="all">
          <span class="fl" @click="show=!show" v-if='show'>账号密码登录</span>
          <span class="fl" @click="show=!show" v-if='!show'>短信验证码登录</span>

          <span class="fr" @click="pushrouper('/register/'+0)">手机快速注册</span>
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
import {land,autoland } from "network/user";
export default {
  name: "login",
  data() {
    return {
      show: true,
    };
  },
  components: {
    navbar,
  },
  created() {
    this.fun();
    // register({
    //   actionKey: "shortmsg", //短信注册/account
    //   telphone: "13456764532",
    //   username: "dswfewf",
    //   password: "3232",
    //   email: "321321@qq.com",
    // }).then((res) => {
    //   console.log(res);
    // });
    land({
      actionKey: "account", 
      username: "cuizhiqing",
      password: "1234567",
    }).then((res) => {
      console.log(res);
      // 更具获取到的登陆吗在重新获取下数据
       autoland({autocode:res.data.user.autocode}).then((res) => {
      console.log(res);
    });
    });
   
  },
  methods: {
    fun() {
      this.$root.$children[0].page4 = "login";
    },
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


