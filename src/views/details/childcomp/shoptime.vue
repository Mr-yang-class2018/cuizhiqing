<template>
  <div id="store">
    <h1>{{addr}}</h1>
    <h1>{{getDistributionTime}}</h1>
  </div>
</template>

<script>
export default {
  name: "shopname",
  data() {
    return {
      shopCeatgory: "自营",
      aa: true //本地还是异地
    };
  },
  components: {},
  computed: {
    addr() {
      //   计算属性可以当成函数使用，所以在计算属性中可以做一些其他操作的，最后使用return返回值给函数名字即可
      let address = this.$store.state.shoppingaddress.takeover_addr;
      address = address.split(",");
      address.pop();
      let temp = [];
      for (let i of address) {
        if (temp.indexOf(i) != -1) {
          temp.push(i);
        }
      }
      if (temp.length == 3) temp.pop();
      return temp.join("");
    },
    getDistributionTime() {
      let newtime = new Date();
      let h = 20;
      let temp = "";
      if (this.shopCeatgory == "自营") {
        if (this.aa) {
          if (h >= 0 && h < 11) {
            temp = `在11：00前下单，预计今天送达`;
          }
          if (h > 11 && h < 23) {
            temp = `在23：00前下单，预计明天( ${this.setDate(
              nowtime,
              1
            )} )送达`;
          }
          if (h > 23) {
            temp = `在明天11：00前下单，预计明天${this.setDate(
              nowtime,
              1
            )}送达`;
          }
        } else {
          if (h >= 0 && h < 11) {
            temp = `在11.00前下单，预计${this.setWeek(
              nowtime,
              3
            )}(${this.setDate(nowtime, 2)})送达`;
          }
          if (h > 11 && h < 23) {
            temp = `在23.00前下单，预计${this.setWeek(
              nowtime,
              3
            )}(${this.setDate(nowtime, 3)})送达`;
          }
          if (h > 23) {
            temp = `在明天11.00前下单，预计${this.setWeek(
              nowtime,
              3
            )}(${this.setDate(nowtime, 2)})17:00送达`;
          }
        }
      } else {
        if (h >= 0 && h < 11) {
          temp = `在11：00前下单，预计今天送达`;
        }
        if (h > 11 && h < 23) {
          temp = `在23：00前下单，预计${this.setWeek(
            nowtime,
            3
          )}(${this.setDate(nowtime, 3)})送达`;
        }
        if (h >= 23) {
          temp = `在明天11：00前下单，预计${this.setWeek(
            nowtime,
            3
          )}(${this.setDate(nowtime, 3)})17：00前送达`;
        }
      }
      return temp;
    }
  },
  created() {
    this.setDate();
    this.setWweek();
  },
  methods: {
    setDate(newtime = new Date(), day = 3) {
      let temp = new Date(newtime.getTime() + day * 24 * 60 * 60 * 1000);
      temp = `${temp.getMonth() + 1}月${temp.getDate()}日`;
      console.log(temp);
      return temp;
    },
    //   重新获取星期几
    setWeek(nowtime = new Date(), day = 15) {
      let newWeek = nowtime.getDay();
      let temp = "";
      if (nowWeek + day > 7) {
        temp = `下周${num(nowWeek + day - 7)}`;
      } else {
        temp = `本周${num(nowWeek + day)}`;
      }
      function num(val) {
        let a = "";
        switch (val % 7) {
          case 1:
            a = "一";
            break;
          case 2:
            a = "二";
            break;
          case 3:
            a = "三";
            break;
          case 4:
            a = "四";
            break;
          case 5:
            a = "五";
            break;
          case 6:
            a = "六";
            break;
          case 7:
            a = "日";
            break;
        }
        return a;
      }
      return temp;
    }
  }
};
</script>
<style lang='scss' scoped>
</style>



