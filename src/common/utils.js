
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
export class selectNorm {
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


// 获取评价
export class Evaluate {
    constructor(evaluate) {
        for (let i = 0; i < evaluate.length; i++) {
            this[i] = {}
            if (evaluate[i].anonymous == 0) {
                let arr = evaluate[i].username.split('')
                let name = ""
                for (let j = 0; j < arr.length; j++) {
                    if (j > 0 && j < arr.length - 1)
                        name += '*'
                    else name += arr[j]
                }
                this[i].username = name
            } else {
                this[i].username = evaluate[i].username
            }
            this[i].headPortrait = evaluate[i].headImg
            let imgArr = evaluate[i].evaluationImg.split(',')
            // this[i].evaluationImg = imgArr.concat(imgArr, imgArr, imgArr, imgArr)
            this[i].evaluationImg = imgArr;
            let time = new Date(evaluate[i].evaluationTime)
            this[i].time = `${time.getFullYear()}-${time.getDay() + 1}-${time.getDate()}`
            this[i].val = evaluate[i].additional
            this[i].highpraise = evaluate[i].highpraise
            this[i].anonymous = evaluate[i].anonymous
        }
    }
}



// 获取details提交到确认订单页面的数据---可修改的额值不在此处获取  num addr norm

export class orderConfirmDate {
    constructor(goods, shops) {
        console.log(goods,shops)
        //商品id
        this.goods_id = goods.id
        //商品名
        this.goods_name = goods.name
        //商品热搜关键字
        this.hot_keyword = goods.hot_keyword
        //商品展示图
        this.img_cover = goods.img_cover
        //新价格
        this.money_now = goods.money_now
        //原价格
        this.money_old = goods.money_old
        //店铺id
        this.shop_id = shops.id
        //店铺名
        this.shop_name = shops.shopName
    }
}
