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