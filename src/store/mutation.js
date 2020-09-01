import router from '../router'
import { postshopcar, addshopcart } from 'network/shopcar'
import { POST_SHOPCART } from './mutation-types'
// import { searchAddr } from "network/address";
import * as types from "./mutation-types"
import { autoland } from 'network/user'

export default {
        [types.BACK]() {
                router.go(-1)
        },
        // 要做的是网络请求---需要在actions中做分发监控，不然同步数据不会改变
        // 要把当前的事件在actions中进行执行
        [POST_SHOPCART](state, payload) {
                console.log(payload)
                postshopcar(payload).then(res => {
                        if (res.code != 200) return console.log('请求数据失败')
                        state.shopcart = {}
                        state.shopcarthistory = {}
                        state.shopcartlength = res.data.length
                        state.temp = res.data
                        state.totalpayment = 0;
                        res.data.forEach(item => {
                                if (!state.shopcart[item.shop_name]) {
                                        state.shopcargoodsnum++
                                        state.shopcart[item.shop_name] = []
                                        state.shopcarthistory[item.shop_name] = []
                                        state.shopCartNameArr.push(item.shop_name)
                                        state.shopCartNameArr1.push(item.shop_name)

                                }
                                let a = {}, b = {}
                                for (let i in item) {
                                        a[i] = item[i]
                                        b[i] = item[i]
                                }
                                state.shopcart[item.shop_name].push(a)
                                state.shopcarthistory[item.shop_name].push(b)


                                if (item.ischeck == "1") {
                                        state.totalpayment +=
                                                item.money_now * item.num;
                                        state.totalnum += item.num
                                        state.paymentgoods.push(item)
                                }
                        })
                        for (let g in state.shopcart) {
                                let gg = 0
                                state.shopcart[g].forEach(item => {
                                        if (item.ischeck == '1') {
                                                gg++
                                        }
                                })
                                if (gg == state.shopcart[g].length) {
                                        state.checkedCities.push(g)
                                }
                        }
                        state.loading = false
                })

        },
        [types.PUSH_ROUTER](state, payload) {
                console.log(payload)
                router.push(payload);
        },
        // [SEARCH_ADDR](state, payload) {
        //         state.addrAll=[]
        //         searchAddr(payload).then(res => {
        //                 state.addrAll = res.data
        //         })
        // },
        [types.AREA_CODE_BACK](state, payload) {
                console.log(payload)
                if (payload == 0) {//用于国际区号页面返回到注册页面
                        alert('ppp')
                        state.area_code = 86
                }
                if (payload > 0) {//选择丢后返回页面
                        alert('kk')
                        state.area_code = payload
                        state.contRegister = false
                }
                if (payload < 0) {//选择丢后返回页面
                        console.log('返回到登录')
                }

                router.go(-1)
        },
        [types.ROUTETO](state, payload) {
                state,
                        router.push(payload)
        },
        [types.AUTO_CODE](state, payload) {
                console.log(payload)
                let data = window.localStorage.getItem(state.localData)
                if (data != undefined && data != null && data != '') {
                       
                        let autocode = JSON.parse(data).autocode
                        console.log(autocode)
                        if (autocode != undefined && data != null && data != '') {
                               autoland({ autocode }).then(res => {
                                        console.log(res)
                                        
                                        payload.resolve(res)
                                })
                        }
                }
        },
        [types.SET_USERINFO](state, payload) {
                console.log(payload)
                state.userinfo = {}
                // let path = window.location.origin + '/jd'
                // state.userinfo = payload.data.user
                for (let i in payload.data.user) {
                        state.userinfo[i] = payload.data.user[i]
                }
                state.changeAddr = payload.data.defaddr
                state.userinfo.defaddr = payload.data.defaddr


                // 先去本地存储取值，在设置autocode
                let data = window.localStorage.getItem(state.localData)
                if (data != null && data != '') {
                        data = JSON.parse(data)
                } else {
                        data = {}
                }
                data.autocode = payload.data.user.autocode
                window.localStorage.setItem(state.localData, JSON.stringify(data))

                if (data.shopcart != undefined && data.shopcart.length > 0) {
                        Promise.all([...data.shopcart.map(item => {
                                item.user_id = state.userinfo.id
                                return new Promise((resolve, reject) => {
                                        addshopcart(item).then(res => {
                                                if (res.code != 200) reject('添加一场')
                                                resolve(res)
                                        })
                                }
                                )
                        })]).then(success => {
                                console.log(success)
                                delete data['shopcart']
                                window.localStorage.setItem(state.localData, JSON.stringify(data))
                                payload.success('执行刷新购物车数据')


                                // 在默认情况下我们添加数据库的时候，添加成功数据库会默认返回一个新增的id值给用户
                                // if(success.length==data.shopcart.length){
                                //         // 相等代表所有数据添加成功
                                //         delete data['shopcart']
                                //         window.localStorage.setItem(state.localData,JSON.stringify(data))
                                // }else{
                                //         // 不想动代表有数据添加失败
                                //         // 获取后台返回的新增id---执行删除---让已经添加的数据消失，重新添加
                                //         delete data['shopcart']
                                //         window.localStorage.setItem(state.localData,JSON.stringify(data))
                                // }

                                // delete data['shopcart']
                                // window.localStorage.setItem(state.localData,JSON.stringify(data))
                        })
                } else {
                        state.loading = false
                }
        },
        // aaa() {
        // console.log(Vue.axios.all)
        //         // 只能针对于知道请求次数的多线程并发请求
        //         Vue.axios.all([addshop()], [addshop()], [addshop()], [addshop()]).then(([res1]) => {
        //                 console.log(res1)
        //         })
        // }

}