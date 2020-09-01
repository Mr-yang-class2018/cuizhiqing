import Vue from 'vue'
import axios from 'axios'//局部axios插件
import VueAxios from 'vue-axios'//可以设置axios为vux全局使用的插件
Vue.use(VueAxios,axios)
export function request(config) {
        //  axios.defaults.headers.post['Content-type']='application/x-www-form-urlencode'
        //  axios.defaults.timeout=5000
         // axios.defaults.baseURL="http://106.12.85.17:8090"
         const instance = new axios.create({
                  baseURL: "http://106.12.85.17:8090",
                  // timeout: 5000
         })
         // 请求拦截
         instance.interceptors.request.use(config => {
                  return config
         })
         // 响应拦截
         instance.interceptors.response.use(res => {
                  return res.data
         }, err => {
                  console.log(err)
         })
         return instance(config)
}
// ip请求
// export function requestip(config) {
//          const instance = new axios.create({
//                   baseURL: "api/cityjson?ie=utf-8",
//                   method:"post"
//          })
//          // 请求拦截
//          instance.interceptors.request.use(config => {
//                   return config
//          })
//          // 响应拦截
//          instance.interceptors.response.use(res => {
//                   return res.data.data
//          }, err => {
//                   console.log(err)
//          })
//          return instance(config)
// }
export function requestcity(config) {
        //  axios.defaults.headers.post['Content-type']='application/x-www-form-urlencode'
        //  axios.defaults.timeout=5000
         const instance = new axios.create({
                  baseURL: "api/cityjson?ie=utf-8",
                  method:"post"
         })
         // 请求拦截
         instance.interceptors.request.use(config => {
                console.log(config)
                  return config
         })
         // 响应拦截
         instance.interceptors.response.use(res => {
                  return res.data
         }, err => {
                  console.log(err)
         })
         return instance(config)
}

export function requestpost(config) {
         const instance = new axios.create({
                  baseURL: "http://106.12.85.17:8090",
                  method:'post'
         })
         // 请求拦截
         instance.interceptors.request.use(config => {
                return config
         })
         // 响应拦截
         instance.interceptors.response.use(res => {
                  return res.data
                  
         }, err => {
                  console.log(err)
         })
         return instance(config)
}