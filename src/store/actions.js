import * as types from "./mutation-types"
export default{
         getshopcart(contents, payload) {
                  contents.commit(types.POST_SHOPCART, payload)
         },
         searchAddr(contents, payload) {
                  contents.commit(types.SEARCH_ADDR, payload)
         },
         autocode(contents) {
                 return contents.commit(types.AUTO_CODE)
         },
}