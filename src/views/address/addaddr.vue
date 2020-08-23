<template>
  <div class="addaddress">
    <navbar class="home-nav-bar">
      <div slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center" v-if="$route.params.did==0">添加收货地址</div>
      <div slot="center" v-if="$route.params.did!=0">编辑收货地址</div>
    </navbar>
    <div>
      <span>收货人</span>
      <input type="text" v-model="name" />
    </div>
    <div>
      <span>联系方式</span>
      <span style="flex:1;">+86</span>
      <i style="flex:1;" class="el-icon-arrow-down"></i>
      <input type="text" style="flex:5" v-model="tel" />
    </div>
    <div>
      <span>所在地区</span>
      <input type="text" v-model="area" />
      <!-- <div class="el-icon-arrow-right">{{area}}</div> -->
    </div>
    <div>
      <span>详细地址</span>
      <textarea name id cols="30" rows="10"></textarea>
    </div>
    <div>
      <span>地址标签</span>
    </div>
    <div>
      <span>只能识别地址</span>
    </div>
    <div v-if="$route.params.did!=0">
      <p>设置默认地址</p>
    </div>
    <el-button
      type="danger"
      class="addr_btn"
      v-if="$route.params.did==0"
      @click="addaddrEv()"
    >保存并使用该地址</el-button>
    <el-button type="danger" class="addr_btn" v-if="$route.params.did!=0" @click="confirmAddr">确认</el-button>
    <el-button class="addr_btn" v-if="$route.params.did!=0">删除收货地址</el-button>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar.vue";
import { addAddr, updatedefadddet } from "network/address";

export default {
  name: "addaddress",
  data() {
    return {
      name: "",
      tel: "",
      area: "",
      id: null,
      obj: null,
    };
  },
  components: {
    navbar,
  },
  created() {
    if (this.$route.params.did != 0) {
      this.obj = JSON.parse(this.$route.params.did);
      // this.updateaddrdet();
      this.name = this.obj.takeover_name;
      this.tel = this.obj.takeover_tel;
      this.area = this.obj.takeover_addr;
      this.id = this.obj.address_id;
    }
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    addaddrEv() {
      addAddr({
        user_id: this.$store.state.userinfo.id,
        takeover_tel: this.tel,
        takeover_name: this.name,
        takeover_addr: this.area,
      }).then((res) => {
        console.log(res);
        // if (this.$store.state.addrAll.length) {
        //   updatedefadd({ address_id: res }).then((res) => {
        //     console.log(res);
        //   });
        // }
      });
      this.$router.push("/confirmorder/" + JSON.stringify(this.$store.state.paymentgoods));
    },
    confirmAddr() {
      this.obj.takeover_name = this.name;
      this.obj.takeover_tel = this.tel;
      this.obj.takeover_addr = this.area;
      this.obj.address_id = this.id;
      updatedefadddet(this.obj).then((res) => {
        console.log(res);
      });
      this.$store.state.changeAddr.takeover_name = this.name;
      this.$store.state.changeAddr.takeover_tel = this.tel;
      this.$store.state.changeAddr.takeover_addr =this.area;
      this.$router.push("/confirmorder/" + JSON.stringify(this.$store.state.paymentgoods));
    },
  },
};
</script>
<style lang='less' scoped>
.addaddress {
  font-size: 14px;
  > div {
    border: 1px solid #f7f7f7;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    > span {
      text-align: left;
      flex: 2;
    }
    > div,
    > input {
      flex: 5;
    }
  }
  .el-icon-arrow-right:before {
    float: right;
  }
  input[type="text"] {
    border: none;
    &:focus {
      outline: none;
      outline-offset: 0px;
    }
  }
}
.addr_btn {
  margin: 10px 0;
  margin: 4%;
  width: 92%;
  border-radius: 20px;
}
</style>
