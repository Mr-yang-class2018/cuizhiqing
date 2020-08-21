// 无论登录还是注册都是和用户有关系的


import { requestpost,request} from './request'

// params get请求或者jquery
// post请求使用data上传数据
// register({
//          actionkey:'shortmsg',//短信注册/account
//          telphone:"",
//          username:'',
//          password:'',
//          email:''
// })

// 手机注册
export function register(data){
         console.log(data)
         return requestpost({
                  url:'/vuedemo/register',
                  data
                           // actionkey:'shortmsg',//短信注册/account
                           // telphone:"",
                           // username:'',
                           // password:'',
                           // email:''
                  
         })
}
// 登录
export function land(data){
         console.log(data)
         return requestpost({
                  url:'/vuedemo/land',
                  data
                  
         })
}


// 自动登录
export function autoland(data){
         console.log(data)
         return requestpost({
                  url:'/vuedemo/autoland',
                  data
                  
         })
}

// 验证手机号
export function regphone(params){
         return request({
                  url:'/vuedemo/land_have_telphone',
                  params
         })
}

// 获取国际区号
export function get_mobile_prefix(){
         return request({
                  url:'/vuedemo/get_mobile_prefix',
                  
         })
}
// 获取手机验证码
export function getcodeimg(params){
         return request({
                  url:'/vuedemo/get_code_img',
                  params
         })
}