import { requestpost } from './request'

export function postshopcar(data="") {
         return requestpost({
                  url: '/vuedemo/get_shopcart',
                  data:{//post方式提交数据的时候，用data，get方式提交数据的时候，用params/query
                           user_id:data
                  }
         })
}

export function updatashopcart(data) {
         return requestpost({
                  url: '/vuedemo/update_shopcart',
                  data
         })
}

export function deletshopcart(data) {
         return requestpost({
                  url: 'vuedemo/delete_shopcart',
                  data
         })
}


export function addshopcart(data) {
         console.log(data)
         return requestpost({
                  url: '/vuedemo/set_shopcart',
                  data
         })
}