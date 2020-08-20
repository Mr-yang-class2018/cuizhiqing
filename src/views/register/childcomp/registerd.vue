<template>
  <div id='registered'>
           <h2>该手机号已经帮顶以上京东账号，请确定是你的账号</h2>
           <input type="text" value="是我的，立即登录">
           <input type="text" value="不是我的，继续注册">

  </div>
</template>

<script>
export default {
  name: 'registered',
  data(){
    return {}
  },
  components: {},
  created(){},
  activated(){},
  deactivated(){},
  mounted(){},
  methods: {}
}
</script>
<style lang='less' scoped>
#registered{
         input{
                  width:96%;
                  margin:10px 2%;
                  height:50px;
                  font-size:20px;
                  border-radius:25px;
                  border:none;
                  outline:none;
         }
         h2{
                  margin-bottom:20px;
         }
}
</style>
