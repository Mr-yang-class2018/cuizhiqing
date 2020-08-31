
// 防抖方法
// 间隔多长时间没有进行某操作（eg:往输入框输入）了在执行
export function debounce(func, delay) {//delay 时间
         let timer = null;
         return function (...args) {
                  if (timer) clearTimeout(timer)
                  timer = setTimeout(() => {
                           // func.apply(this,args)
                           func.apply(this, args)

                  }, delay)
         }
}

// 从商品详情中取出更商品有关的数据---->detailsbaseinfo
// export function GoodsInfo(goods, shops) {//es5创建构造函数
//          this.oldPrice = goods.money_old
//          this.newPrice = goods.money_now
//          this.title = goods.name
//          this.goodsId = goods.id
//          this.category = shops.category


// }
export class GoodsInfo {//es6类
         constructor(goods, shops) {
                  this.oldPrice = goods.money_old
                  this.newPrice = goods.money_now
                  this.title = goods.name
                  this.goodsId = goods.id
                  this.category = shops.category
         }
}
// 从店铺中取出有用的数据
export class ShopInfo {
         constructor(shops) {
                  this.shopName = shops.shopName
                  this.cGoods = shops.cGoods
                  this.shopLogo = shops.shopLogo
                  this.id = shops.id
                  this.category = shops.category
                  this.collection = '5000'//被收藏的次数
         }
}
// 返回定义评价的class类




// 从规格和关联数据中取数据
export class selectNorm{
         constructor(norm, relation) {
                  if (norm.length > 0) {
                           this.norm = {}
                           for (let i = 0; i < norm.length; i++) {
                                    if (!this.norm[norm[i].ggname]) {
                                             this.norm[norm[i].ggname] = []
                                    }
                                    this.norm[norm[i].ggname].push(norm[i])
                           }
                  }
                  if (relation.length > 0) {
                           this.relation = {}
                           for (let i = 0; i < relation.length; i++) {
                                    if (!this.relation[relation[i].relation_name]) {
                                             this.relation[relation[i].relation_name] = []
                                    }
                                    this.relation[relation[i].relation_name].push(relation[i])
                           }

                  }
         }
}