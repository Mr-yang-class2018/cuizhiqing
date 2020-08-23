import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './actions'


Vue.use(Vuex)

const state = {
         path: "http://106.12.85.17:8090/public/image",
         
         tabbar: {
                  is_jd_tabbar: true,
                  is_jx_tabbar: false,
         },
         keepexclude:'detail,confirmorder,pay,shopcartab,cart,cartgoods,register',
         
         keepinclude:'home',
         // userinfo: {
         //          id:null,
         //          defaddr:null,
         //          // email:,
         //          // name:,
         //          // qq:,
         //          // wx:,
         //          // img:,
         // },
         userinfo:null,
         addrAll:[],
         changeAddr:{},
         shopcart: null,
         shopcarthistory:null,//在页面渲染的时候，购物车加载的时候取一下默认值，在离开购物车页面的时候，用购物车页面的值和当前的值做对比，如果当前数据中不存在，直接提交数据，存在的值，对比后提交数据
         loginhistory: "/home",//进入login的记录
         shopcartlength: 0,
         temp: null,
         shopingaddress:'山西省晋城市阳城县',
         city:null,
         sknavigation:null,//用于记录tabbar的上个路由路径
         totalpayment:0,//支付总价
         totalnum:0,//支付数量
         shopcarmoneyall:0,//购物车所有商品价格总和
         shopcargoodsnum:0,//购物车所有商品总数量
//         ---------------
         shopCartNameArr:[],//店铺名字
         indexArr:{},//店铺名和旗下商品id
         checkedCities: [],
         area_code:86,

         paymentgoods:[],

         contRegister:true,



         areahistory:'/home'
}

const x = new Vuex.Store({
         state,
         mutations,
         actions
})

export default x