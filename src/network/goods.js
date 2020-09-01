import { request } from './request'
export function getgoods(data) {
         // return request({
         //          url: "/vuedemo/get_goods",
         //          params: {
         //                   like: "电脑",//模糊查询
         //                   order: {//先以id降序，在以DtoU升序
         //                            id: "UtoD",
         //                            money_new: 'DtoU'
         //                   }
         //          }
         // })
         // 用于搜素数据，关键字查数据
         return request({
                  url: "/vuedemo/get_goods",
                  params: { ...data }
         })
}


// 用于详情页面更具商品id请求出当前商品的数据以及商品规格数据以及发布
export function getgoodsId(id) {
         return request({
                  url: "/vuedemo/get_goodsDet",
                  params: {
                           goods_id: id
                  }
         })
}

// 
export function allEvaluate(params) {
         return request({
                  url: "/vuedemo/get_goods_sevaluate",
                  params: { 
                           goods_id: params
                  }
         })
}



// export  class goods{
//          constructor(goodsdata,noorms,relationgoods){
//          this.name = name;
//          this.age = age
//          }
// }

// export  class goods{
//          constructor(shopinfo){

//          }
// }