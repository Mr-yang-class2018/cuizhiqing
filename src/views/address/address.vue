<template>
  <div class="address1">
    <scroll ref="addscroll" class="addscroll">
      <navbar>
        <div slot="left" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center" class="tab-center">收货地址</div>
      </navbar>
    </scroll>
    <div v-if="$store.state.userinfo.defaddr" class="addrall">
      <ul>
        <li v-for="(item,index) in $store.state.addrAll" :key="index">
          <el-radio
            @change="changeaddd(item)"
            v-model="$store.state.changeAddr.takeover_tel"
            :label="item.takeover_tel"
          ></el-radio>
          <div>
            <p>
              <span>{{item.takeover_tel | changeTel}}</span>
              <span>{{item.takeover_name}}</span>
            </p>
            <p>{{item.takeover_addr}}</p>
          </div>
          <span @click="pushrouper('/addaddr/'+JSON.stringify(item))">编辑</span>
        </li>
      </ul>
    </div>
    <div v-if="!$store.state.userinfo.defaddr">该账号还没有收货地址</div>

    <div style="position:fixed;bottom:0;width:100%;">
      <el-button
        type="danger"
        style="margin:10px 0;margin:4%;width:92%;border-radius:20px;"
        @click="pushrouper('/addaddr/0')"
      >新增收货地址</el-button>
    </div>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar";
import scroll from "components/content/scroll/scroll";
import {searchAddr} from 'network/address.js'
export default {
  name: "address1",
  data() {
    return {
      indexAddr: 0,
    };
  },
  components: {
    navbar,
    scroll,
  },
  created() {
    this.addr();
    console.log(this.$store.state.isshow);
  },
  methods: {
    changeaddd(item) {
      console.log(item);
      this.$store.state.changeAddr = item;
      this.$router.push(
        "/confirmorder/aaa" 
      );
    },
    addr() {
      searchAddr({
        user_id: this.$store.state.userinfo.id,
      }).then((res) => {
        this.$store.state.addrAll = res.data;
      });
    },
  },
  filters: {
    changeTel(val) {
      return val.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    },
  },
};
</script>
<style lang='less'>
.address1 {
  .addscroll {
    height: calc(100%-80px);
  }

  .el-radio__input.is-checked .el-radio__inner {
    background: red;
    border-color: red;
  }
  .el-radio__inner {
    width: 20px;
    height: 20px;
  }
  .el-radio__input.is-checked .el-radio__inner::after {
    width: 100%;
    height: 100%;
    content: "√";
    background: transparent;
    color: white;
    line-height: 20px;
  }
}
.addrall {
  overflow: hidden;
  ul {
    padding: 0 10px;
    li {
      display: flex;
      flex-wrap: wrap;
      padding: 15px 0;
      border-bottom: 1px solid #ddd;
      > div {
        flex: 5;
      }
      .el-radio__input {
        flex: 1;
      }
      .el-radio__label {
        display: none;
      }
      p {
        margin: 0;
      }
    }
  }
}
</style>
