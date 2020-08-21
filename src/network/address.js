import { request } from './request'

// 新增地址
export function addAddr(params) {
         return request({
                  url: "/vuedemo/creat_user_address",
                  params
         })
}

// 查询用户的所有地址
export function searchAddr(params) {
         return request({
                  url: "/vuedemo/get_user_address",
                  params
         })
}
// 修改为默认地址
export function updatedefadd(params) {
         return request({
                  url: "/vuedemo/update_user_address_def",
                  params
         })
}