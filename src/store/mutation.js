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
        [types.PUSH_ROUTER](state, payload) {
                router.push(payload);
        },
        [types.ROUTETO](state, payload) {
                state,
                        router.push(payload)
        },
        // 要做的是网络请求---需要在actions中做分发监控，不然同步数据不会改变
        // 要把当前的事件在actions中进行执行
        [POST_SHOPCART](state, payload) {
                postshopcar(payload).then(res => {
                        if (res.code != 200) return console.log('请求数据失败')
                        state.shopcarthistory = {}
                        state.checkedCities = []
                        state.shopCartNameArr = []
                        state.shopcargoodsnum = 0
                        state.shopcartlength = res.data.length
                        state.shopcart = state.shopcartlength == 0 ? null : {}
                        state.temp = res.data
                        state.totalpayment = 0;
                        res.data.forEach(item => {
                                if (!state.shopcart[item.shop_name]) {
                                        state.shopcart[item.shop_name] = []
                                        state.shopcarthistory[item.shop_name] = []
                                        state.shopCartNameArr.push(item.shop_name)
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
                                        state.shopcargoodsnum += item.num
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
                        console.log(state.checkedCities)
                        console.log(state.userinfo)
                })
        },
        // [SEARCH_ADDR](state, payload) {
        //         state.addrAll=[]
        //         searchAddr(payload).then(res => {
        //                 state.addrAll = res.data
        //         })
        // },
        [types.AREA_CODE_BACK](state, payload) {
                if (payload == 0) {//用于国际区号页面返回到注册页面
                        state.area_code = 86
                }
                if (payload > 0) {//选择丢后返回页面
                        state.area_code = payload
                        state.contRegister = false
                }
                if (payload < 0) {//选择丢后返回页面
                        console.log('返回到登录')
                }

                router.go(-1)
        },
        [types.AUTO_CODE](state, payload) {
                let data = window.localStorage.getItem(state.localData)
                if (data != undefined && data != null && data != '') {
                        let autocode = JSON.parse(data).autocode
                        if (autocode != undefined && data != null && data != '') {
                                autoland({ autocode }).then(res => {
                                        payload.resolve(res)
                                })
                        }
                }
        },
        [types.SET_USERINFO](state, payload) {

                // 把用户中的收藏店铺做处理
                if (payload.data.user.collectShop){
                        payload.data.user.collectShop=payload.data.user.collectShop.split(',')
                }else{
                        payload.data.user.collectShop=[]
                }




                        // 设置状态管理中userinfo，changeAddr
                        state.userinfo = {}
                for (let i in payload.data.user) {
                        state.userinfo[i] = payload.data.user[i]
                }
                state.changeAddr = payload.data.defaddr
                state.userinfo.defaddr = payload.data.defaddr

                console.log(state.userinfo)

                // 先去本地存储取值，设置autocode
                let data = window.localStorage.getItem(state.localData)
                console.log(data)
                if (data != null && data != '' && data != undefined) {
                        data = JSON.parse(data)
                } else {
                        data = {}
                }
                data.autocode = payload.data.user.autocode
                window.localStorage.setItem(state.localData, JSON.stringify(data))

                // 把本地存储购物车数据在用户登录的情况下存储到数据库
                if (data.shopcart != undefined && data.shopcart.length > 0) {
                        console.log(data.shopcart)
                        Promise.all([...data.shopcart.map(item => {
                                item.user_id = state.userinfo.id
                                return new Promise((resolve, reject) => {
                                        addshopcart({ goods_id: item.goods_id, num: item.num, norm: item.norm, takeover_addr: item.takeover_addr, user_id: item.user_id }).then(res => {

                                                if (res.code != 200) reject('添加异常')
                                                resolve(res)
                                        })
                                })
                        })]).then(success => {
                                console.log(success)
                                delete data['shopcart']
                                window.localStorage.setItem(state.localData, JSON.stringify(data))
                                console.log(window.localStorage.getItem(state.localData))
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