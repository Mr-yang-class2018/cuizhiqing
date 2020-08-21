module.exports = {
         configureWebpack: {//与webpack的配置合并
                  resolve: {
                           extensions: [],//设置默认后缀名，检测js，css等
                           alias: {
                                    // "@":"/src",//默认 在2.0创建的时候不能给其他的别名使用
                                    "assets": "@/assets",
                                    "components": "@/components",
                                    "views": "@/views",
                                    "network": "@/network",
                                    "common": "@/common",//common指的是公共js文件夹
                                    "store": "@/store",

                           },//别名        
                  },
                  // VUE_APP_BASE_API= /api
                  // 对服务运行添加代理服务
                  // baseUrl:'/',
                  devServer: {
                           proxy: {//代理
                                    '/api':{
                                             target: "http://pv.sohu.com",//接口的域名，注意这里是域名，不是完整的ip
                                             changeOrigin: true,//如果是https接口，需要配置这个参数
                                             ws: true,
                                             pathRewrite: {//重写变量('/api')路径
                                                      '^/api': ''
                                             }
                                    }
                           }
                  }

         
         }
}