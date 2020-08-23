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
          <el-checkbox-group  v-model="item.default"> 
            <el-checkbox :label="item.takeover_tel"></el-checkbox>
          </el-checkbox-group>
          <div>
            <p>
              <span>{{item.takeover_tel}}</span>
              <span>{{item.takeover_name}}</span>
            </p>
            <p>{{item.takeover_addr}}</p>
          </div>
          <span @click="pushrouper('/addaddr/'+JSON.stringify({address_id:item.id,takeover_tel:item.takeover_tel,takeover_name:item.takeover_name,takeover_addr:item.takeover_addr}))">编辑</span>
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

export default {
  name: "address1",
  data() {
    return {
      indexAddr:0
    };
  },
  components: {
    navbar,
    scroll,
  },
  created() {
    this.addr();
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    addr() {
      this.$store.dispatch("searchAddr", {
        user_id: this.$store.state.userinfo.id,
      });
    },
  },
};
</script>
<style lang='less'>
.address1 {
  .addscroll {
    height: calc(100%-80px);
  }
}
.addrall{
  overflow: hidden;
  ul{
    padding: 0 10px;
    li{
      display: flex;
      flex-wrap:wrap;
      padding: 15px 0;
      border-bottom:1px solid #ddd;
      >div{
        flex:5;
      }
      .el-checkbox-group{
        flex:1;
        .el-checkbox__label{
          display:none;
        }
      }
      p{
        margin:0;
      }
    }
  }
}
</style>
