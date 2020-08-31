<style  lang='less' scoped>
.price {
  display: flex;
  flex-wrap: wrap;
  > div {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    &:first-child {
      flex: 2.1;
      p {
        font-size: 16px;
        &:first-child {
          color: red;
          margin-right: 8px;
          font-weight: 550;

          > span {
            font-weight: bold;

            font-size: 30px;
          }
        }
        > span {
          margin-left: -6px;
        }
        &:nth-child(2) {
          margin-top: 14%;
          text-decoration: line-through;
        }
      }
    }
    &:nth-child(2) {
      font-size: 14px;
      > p {
        flex: 1;
        &:first-child {
          margin-right: 8px;
        }
        img {
          width: 18px;
          height: 18px;
          padding:0 8px;
        }
      }
    }
  }
}
.category{
  text-align: left;
  line-height:22px;
  font-size:16px;
  font-weight: bold;
  span{
    font-size:12px;
  font-weight: normal;
    border-radius: 4px;
    background:red;
    color:#fff;
    padding:0 4px;
  }
}
</style>

<template>
  <div class="detailbaseinfo" v-if="Object.keys(goodsinfo).length !=0">
    <div class="price">
      <div>
        <p>
          ￥
          <span>{{goodsinfo.newPrice}}</span>.00
        </p>

        <p>
          ￥
          <span>{{goodsinfo.oldPrice}}</span>.00
        </p>
      </div>
      <div>
        <p>
          <img src="~assets/img/money.png" alt />
          <span>降价提醒</span>
        </p>
        <p>
                   <img src="~assets/img/love.png" alt />
          <span>收藏</span>
        </p>
      </div>
    </div>
    <div class="category">
      <span
        v-if="goodsinfo.category=='个体'"
      >{{goodsinfo.category}}</span>
      {{goodsinfo.title}}
    </div>
    <div>
      <span v-for="(item,index) in goodsinfo.imglist" :key="index">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailbaseinfo",
  data() {
    return {};
  },
  props: {
    goodsinfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {},
  created() {},
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {},
  filters: {
    changeprice(val, str) {
      if (arguments[1]) {
        return str + Number(val).toFixed(2);
      } else {
        return Number(val).toFixed(2);
      }
    },
  },
};
</script>




