import { request } from './request'

export function getTabbar(path) {
         console.log(path)
         return request({
                  url: '/vuedemo'+path
         })
}