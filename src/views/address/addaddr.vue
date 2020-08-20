<template>
  <div class="addaddress">
    <navbar class="home-nav-bar">
      <div slot="left" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
      <div slot="center">添加收货地址</div>
    </navbar>
    <div>
      <span>收货人</span>
      <input type="text" v-model="name" />
    </div>
    <div>
      <span>联系方式</span>
       <span style="flex:1;">+86</span> 
        <i style="flex:1;" class="el-icon-arrow-down"></i>
        <input type="text" style="flex:5" v-model="tel"/>
    </div>
    <div>
      <span>所在地区</span>
      <div class="el-icon-arrow-right">{{area}}</div>
    </div>
    <div>
      <span>详细地址</span>
      <textarea name="" id="" cols="30" rows="10"></textarea>
    </div>
    <div>
      <span>地址标签</span>
    </div>
    <div>
      <span>只能识别地址</span>
    </div>
    <el-button type="danger" style="margin:10px 0;margin:4%;width:92%;border-radius:20px;" @click="addaddrEv()">确认</el-button>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar.vue";
import {addAddr} from "network/address";

export default {
  name: "addaddress",
  data() {
    return {
      name:'哈哈哈',
      tel:'15526787653',
      area:'山西省,晋城市,阳城县'
    };
  },
  components: {
    navbar
  },
  created() {},
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    addaddrEv(){
      addAddr({user_id:this.$store.state.userinfo.id,takeover_tel:this.tel,takeover_name:this.name,takeover_addr:this.area}).then(res=>{
        console.log(res)
      })
    }
  },
};
</script>
<style lang='less' scoped>
.addaddress {
         font-size: 14px;;
  > div {
    border: 1px solid #f7f7f7;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    > span {
             text-align: left;
      flex: 2;
    }
    >div,>input{
             flex:5;
    }
  }
  .el-icon-arrow-right:before{
           float: right;
  }
  input[type='text']{
           border:none;
            &:focus {
        outline: none;
        outline-offset: 0px;
      }
  }
}
</style>
