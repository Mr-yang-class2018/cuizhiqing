import { requestpost } from './request'
export function createorder(data){
         // data在传递过来 之前就需要定义好格式
            console.log(data)
         return requestpost({
                  url:'vuedemo/creat_order',
                  data
         })
}

export function getorderbyorderid(data){
      console.log(data)
         return requestpost({
                  url:'vuedemo/get_goods_inorder',
                  data:{
                           order_id:data
                  }
         })
}


export function updataorderstate(data){
   console.log(data)
      return requestpost({
               url:'vuedemo/update_order_state',
               data
      })
}

export function userorderall(data){
   console.log(data)
      return requestpost({
               url:'vuedemo/get_order',
               data
      })
}


export function create_details_order(data){
    return requestpost({
        url:'/vuedemo/buy_goods',
        data
    })
}
