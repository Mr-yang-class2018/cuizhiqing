import router from '../router'
import { postshopcar } from 'network/shopcar'
import { POST_SHOPCART, SEARCH_ADDR } from './mutation-types'
import { searchAddr } from "network/address";
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
                                        state.indexArr[item.shop_name] = []
                                        state.shopCartNameArr.push(item.shop_name)
                                }
                                let a = {}, b = {}
                                for (let i in item) {
                                        a[i] = item[i]
                                        b[i] = item[i]
                                }
                                state.shopcart[item.shop_name].push(a)
                                state.shopcarthistory[item.shop_name].push(b)
                                state.indexArr[item.shop_name].push(a.goods_id)


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
                })

        },
        [types.PUSH_ROUTER](state, payload) {
                console.log(payload)
                router.push(payload);
        },
        [SEARCH_ADDR](state, payload) {
                searchAddr(payload).then(res => {
                        state.addrAll = res.data
                })
        },
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
        [types.AUTO_CODE]() {
                let path = window.location.origin + '/jd'
                let autocode = window.localStorage.getItem(path)
                return autoland({ autocode })
                // .then(res => {
                //         console.log(res)
                //         state.userinfo = res.userinfo
                //         state.userinfo.deaddr = res.deaddr
                //         window.localStorage.setItem(path, res.data.user.autocode)
                // })
        },
        [types.SET_USERINFO](state, payload) {
                console.log(payload)
                 state.userinfo = {}
                let path = window.location.origin + '/jd'
                // state.userinfo = payload.data.user
                for(let i in payload.data.user){
                  state.userinfo[i] = payload.data.user[i]
                }
                state.changeAddr=payload.data.defaddr
                state.userinfo.defaddr = payload.data.defaddr
                window.localStorage.setItem(path, payload.data.user.autocode)

console.log(state.changeAddr)
               
                
        }

}