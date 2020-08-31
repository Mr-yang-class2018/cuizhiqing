<template>
  <div id="details">
    <navbar @leftparent="$store.commit('BACK')" class="navbarfir">
      <div slot="left">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="right">
        <pagejump></pagejump>
      </div>
    </navbar>

    <navbar @leftparent="$store.commit('BACK')" class="navbarsec">
      <div slot="left">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center" class="tab-center">
        <div
          v-for="(item,index) in titlearr"
          class="tabcenter-item"
          :key="index"
          @click="clickdet(index)"
          :class="item==isactive?'active':null"
        >{{item}}</div>
      </div>
      <div slot="right">
        <pagejump></pagejump>
      </div>
    </navbar>

    <scroll
      class="detcontent"
      ref="detcontent"
      :probeType="3"
      @parentscroll="detscroll"
      :pull-up-load="true"
    >
      <!-- <details-rotation :goodsimg="goodsimg" :path1="path" :goodslen='goodslen'></details-rotation> -->
      <detailfeature :dfeature="goodsimg" :goodslen="goodslen" ref="detailfeature"></detailfeature>
      <detailinfo :goodsinfo="detailsgoods"></detailinfo>
      <shop-info :shopInfo="shopInfo"></shop-info>

      <div class="evaluate pjia" style="font-size:12px;padding-top:20px;padding-bottom:20px;">
        <h1 class="head" style="text-align:left;display:flex;flex-wrap:wrap;font-size:15px;">
          评价 18万+
          <span style="text-align:right;flex:1;font-size:12px;">好评度</span>
        </h1>
        <ul>
          <li v-for="(i,index) in evalue" :key="i" v-show="index<2">
            <div class="title">
              <span class="user">用户头像+名称</span>
              <!-- 评价应为倒序排列。最新评价在最上面 -->
              <span class="time">{{evaluateTime}}</span>
            </div>
            <div
              class="value"
              style="text-overflow:ellipsis;overflow:hidden;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;"
            >评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容</div>
            <div>评价图片</div>
          </li>
        </ul>
        <button v-if="evalue.length>2">查看更多评价</button>
      </div>

      <div class="yhui">
        <div style="flex:1;">优惠</div>
        <div style="width:72%;margin-left:10px;text-align:left;">
          <div>
            <span>换购</span>是否有换购问问大萨达撒多撒
          </div>
          <div>
            <span>限购</span>是否有限购大的萨达发生发放擦拭法撒
          </div>
        </div>
        <el-button
          type="text"
          @click="open('dialogVisibleh')"
          class="el-icon-more"
          style="flex:1;"
          :close-on-click-modal="true"
        ></el-button>
      </div>

      <div class="detlist">
        <div>
          <div style="flex:1;">已选</div>
          <div style="width:72%;margin-left:10px;text-align:left;"></div>
          <el-button
            type="text"
            class="el-icon-more"
            @click="open('select')"
            style="flex:1;"
            :close-on-click-modal="true"
          >
         
            </el-button>
        </div>

        <div>
          <div style="flex:1;">送至</div>
          <div style="width:72%;margin-left:10px;text-align:left;">
            <p>{{addr}}</p>
             <p>
              <span style="color:red">现货</span>
              {{getDistributionTime}}
            </p>
          </div>
          <el-button
            type="text"
            class="el-icon-more"
            @click="open('arrive')"
            style="flex:1;"
            :close-on-click-modal="true"
          ></el-button>
        </div>

        <div v-if="free_freight">
          <div style="flex:0.5;">运费</div>
          <div style="width:72%;margin-left:10px;text-align:left;">
            <p>免运费</p>
          </div>
        </div>

        <div v-else>
          <div style="flex:0.5;">重量</div>
          <div style="width:72%;margin-left:10px;text-align:left;">
            <p>不免运费，显示重量</p>
          </div>
        </div>
        <div>
          <div style="flex:1;">服务</div>
          <div style="width:72%;margin-left:10px;text-align:left;"></div>
          <el-button
            type="text"
            class="el-icon-more"
            @click="open('searve')"
            style="flex:1;"
            :close-on-click-modal="true"
          ></el-button>
        </div>
      </div>

      <div class="detaildet" style="height:500px;">
        <div style="text-align:left;">猜你喜欢</div>
        <ul>{{detailsgoods}}</ul>
      </div>

      <div class="commonddet" style="margin-bottom:0;">
        <div class="titlenav">
          <div
            v-for="(item,index) in comnavarr"
            :key="index"
            @click="num=index"
            class="comtitle"
            :class="index==num?'active':null"
          >{{item}}</div>
        </div>
      </div>
      <div class="comconnect" style="border-radius:0;height:200px;">
        <div v-if="0==num">商品介绍</div>
        <div v-if="1==num">规格参数</div>
        <div v-if="2==num">售后保障</div>
      </div>
    </scroll>
    <detbar></detbar>
    <el-drawer
      title="优惠"
      :visible.sync="dialogVisibleh"
      direction="btt"
      width="100%"
      :append-to-body="true"
      :widthHeader="false"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleh = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisibleh = false"
          :cloase-on-press-escape="false"
        >确 定</el-button>
      </span>
    </el-drawer>

    <el-drawer
      title="已选"
      :visible.sync="select"
      direction="btt"
      width="100%"
      :append-to-body="true"
      :widthHeader="false"
    >
      <div>
           
            <div v-for="(item,index) in  selectNorm" :key='index'>
                <div v-for="(i,j) in item" :key='j'>
<div>{{j}}</div>
<div v-for='(m,n) in i' :key='n'>
{{m.name}}
</div>
                </div>
            </div>
            </div>
    </el-drawer>

    <el-drawer
      title="送至"
      :visible.sync="arrive"
      direction="btt"
      width="100%"
      :close-on-press-escape='false'
      :append-to-body="true"
      :widthHeader="false"
      custom-class='自定义类名'
    >
    <ul>
      <li v-for='(item,index) in this.$store.state.addrAll' :key="index">
        {{item.takeover_addr | changeAddr}}
      </li>
    </ul>
    </el-drawer>

    <el-drawer
      title="服务"
      :visible.sync="searve"
      direction="btt"
      width="100%"
      :append-to-body="true"
      :widthHeader="false"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="searve = false">取 消</el-button>
        <el-button type="primary" @click="searve = false" :cloase-on-press-escape="false">确 定</el-button>
      </span>
    </el-drawer>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar";
import detbar from "components/content/mainTabbar/detBar";
// import detailsRotation from "./childcomp/detailsrotation";
import detailfeature from "./childcomp/detailfeature";
import detailinfo from "./childcomp/detailbaseinfo";
import shopInfo from "./childcomp/shopInfo";
import scroll from "components/content/scroll/scroll";
import { getgoods, getgoodsId } from "network/goods";
import { searchAddr } from "network/address";
import pagejump from "components/common/pageJump/pageJump";
import { GoodsInfo, ShopInfo,selectNorm } from "common/utils";
export default {
  name: "detail",
  data() {
    return {
      aa: true,
      getdata: {
        //提交的数据
        exact: {
          //精确查找
        },
        // page: 1,
      },
      discount1: false,
      dialogVisibleh: false,
      select: false,
      arrive: false,
      searve: false,
      evalue: [1, 2, 3, 4, 5],
      detailsgoods: {},
      goodsimg: [],
      titlearr: ["商品", "评价", "详情", "推荐"],
      comnavarr: ["商品介绍", "规格参数", "售后保障"],
      opacityfir: 1,
      opacitysec: 0,
      position1: 0,
      goodslen: 0,
      elem: null,
      indexhis: {},
      isactive: null,
      num: 0,
      shopInfo: {},
      free_freight: 0,
      shopCeatgory:'',
      selectNorm:null,
    };
  },
  components: {
    navbar,
    // detailsRotation,
    scroll,
    detailfeature,
    detailinfo,
    detbar,
    pagejump,
    shopInfo,
  },
  created() {
    this.getdata.exact.id = this.$route.params.id;
    this.getGoods(this.getdata.exact.id);
    //  在keep-alive状态下，created()方法只执行1次，因为当前组件不会销毁

  },
  computed: {
    evaluateTime() {
      //评价时间是在数据库中获取到的
      let time = new Date();
      return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
    },
      addr(){
       if (this.$store.state.ShoppingAddress) {
        return this.setaddr();
      } else {
        return "山西省 晋城市";
      }
    },
    getDistributionTime() {
      let nowtime = new Date();
      let h = nowtime.getHours();
      let temp = "";
      console.log(h)
      if (this.shopCeatgory == "自营") {
        if (this.aa) {
          if (h >= 0 && h < 11) {
            temp = `11：00前下单，预计(今天)17:00前送达`;
          }
          if (h > 11 && h < 23) {
            temp = `在23：00前下单，预计明天${nowtime.getMonth()+1}月${nowtime.getDate()+1}日送达`;
          }
          if (h >= 23) {
            temp = `在明天11：00前下单，预计明天${nowtime.getMonth()+1}月${nowtime.getDate()+1}日送达`;
          }
        } else {
          if (h >= 0 && h < 11) {
            temp = `在11.00前下单，预计今日17:00前送达`;
          }
          if (h > 11 && h < 23) {
            temp = `在23.00前下单，预计明天${nowtime.getMonth()+1}月${nowtime.getDate()+1}日送达`;
          }
          if (h > 23) {
            temp = `在明天11.00前下单，预计${nowtime.getMonth()+1}月${nowtime.getDate()+1}日送达`;
          }
        }
      } else {
        if (h >= 0 && h < 11) {
          temp = `在11：00前下单，预计${this.setWeek(nowtime,3)}${this.setDate(nowtime,3)}送达`;
        }
        if (h > 11 && h < 23) {
          temp = `在23：00前下单，预计${this.setWeek(
            nowtime,
            4
          )}(${this.setDate(nowtime, 4)})日送达`;
        }
        if (h >= 23) {
          temp = `在明天11：00前下单，预计${this.setWeek(
            nowtime,
            4
          )}(${this.setDate(nowtime, 4)})送达`;
        }
      }
      return temp;
    }
  },
  activated() {},
  methods: {
    setDate(newtime, day) {
      let temp = new Date(newtime.getTime() + day * 24 * 60 * 60 * 1000);
      temp = `${temp.getMonth() + 1}月${temp.getDate()}日`;
      console.log(temp);
      return temp;
    },
    //   重新获取星期几
    setWeek(nowtime,day) {
      let nowWeek = nowtime.getDay();
      let temp = "";
      nowWeek=nowWeek==0?7:nowWeek
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
    },
    detscroll(position) {
      var chan = this.position1 - position.y;
      this.position1 = position.y;
      if (Math.abs(position.y) < this.indexhis.shop) {
        this.isactive = "商品";
        if (-position.y < 100) {
          document.querySelector(".navbarfir").style.opacity =
            this.opacityfir - 0.01 * chan;
          this.opacityfir -= 0.01 * chan;
          document.querySelector(".navbarsec").style.opacity =
            this.opacitysec + 0.01 * chan;
          this.opacitysec += 0.01 * chan;
        } else if (position.y < -100) {
          document.querySelector(".navbarfir").style.opacity = 0;
          document.querySelector(".navbarsec").style.opacity = 1;
          this.opacityfir = 0;
          this.opacitysec = 1;
        }
      } else if (Math.abs(position.y) < this.indexhis.pjia) {
        this.isactive = "评价";
      } else if (Math.abs(position.y) < this.indexhis.detaildet) {
        this.isactive = "详情";
      } else {
        this.isactive = "推荐";
      }
    },
    getGoods(data) {
      getgoodsId(data).then((res) => {
        console.log(res);
        // this.detailsgoods = res.data.goodsData;

        this.detailsgoods = new GoodsInfo(
          res.data.goodsData,
          res.data.shopData
        );
        this.shopInfo = new ShopInfo(res.data.shopData);

        this.goodsimg = res.data.goodsData.img_detalis_list;
        this.goodslen = this.goodsimg.length;
        this.free_freight = res.data.goodsData.free_freight == 0 ? false : true;
        console.log(this.detailsgoods);
        this.shopCeatgory=this.detailsgoods.category

        this.selectNorm=new selectNorm(res.data.norms,res.data.relationGoods)
      });
    },
    getGoods1(data) {
      getgoods(data).then((res) => {
        console.log(res);
        this.detailsgoods = [...res.data];
      });
    },
    clickdet(index) {
      if (index == this.titlearr.length - 1) {
        this.elem = ".commonddet";
      } else if (index == 1) {
        this.elem = ".pjia";
      } else if (index == 2) {
        this.elem = ".detaildet";
      } else if (index == 0) {
        this.elem = "#detailfeature";
      }
      if (index != 0) {
        document.querySelector(".navbarfir").style.opacity = 0;
        document.querySelector(".navbarsec").style.opacity = 1;
        this.opacityfir = 0;
        this.opacitysec = 1;
      }

      this.$refs.detcontent.scrollTo1(
        0,
        -document.querySelector(this.elem).offsetTop + 60,
        300
      );
    },
    open(val) {
      if (val == "dialogVisibleh") {
        this.dialogVisibleh = true;
      }
      if (val == "select") {
        this.select = true;
      }
      if (val == "arrive") {
        this.arrive = true;
        console.log(this.$store.state.addrAll)
        if (this.$store.state.addrAll == null) {
          searchAddr({ user_id: this.$store.state.userinfo.id }).then((res) => {
            this.$store.state.addrAll=res.data
            console.log(res.data)
          });
        }
      }
      if (val == "searve") {
        this.searve = true;
      }
    },
  
     setaddr() {
      //   计算属性可以当成函数使用，所以在计算属性中可以做一些其他操作的，最后使用return返回值给函数名字即可
      let address = this.$store.state.shoppingaddress.takeover_addr;
      address = address.split(",");
      address.pop();
      let temp = [];
      for (let i of address.values()) {
        if (temp.indexOf(i) != -1) {
          temp.push(i);
        }
      }
      if (temp.length == 3) temp.pop();
      return temp.join("");
    },
  },
  filters: {
    changeprice(val, str) {
      if (arguments[1]) {
        return str + Number(val).toFixed(2);
      } else {
        return Number(val).toFixed(2);
      }
    },
    changeAddr(val){
        let addr=val.split(',').join('')
        return addr
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (to.path.split("/")[1] == "details") {
        vm.$root.$children[0].page4 = "det";
      }
    });
  },
  mounted() {
    this.indexhis = {
      shop: document.querySelector(".pjia").offsetTop + 60,
      pjia: document.querySelector(".detaildet").offsetTop + 60,
      detaildet: document.querySelector(".commonddet").offsetTop + 60,
    };
  },
};
</script>
<style lang='less'>
#details {
  background: #ddd;
  /* padding-top: 44px; */
  height: 100vh; /*把本身高度分成100分*/
  position: relative;
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    .left,
    .right,
    .left,
    .right {
      width: 30px;
      height: 30px;
      line-height: 32px;
      margin-top: 7px;
    }
    .right {
      line-height: 30px;
    }
    .tab-center {
      display: flex;
      .tabcenter-item {
        flex: 1;
      }
    }
  }
  .navbarfir {
    opacity: 1;
    background: transparent;
    color: white;
    padding: 0 7px;
    .el-dropdown {
      color: white;
    }
    .left,
    .right {
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.3);
    }
  }
  .navbarsec {
    opacity: 0;
    background: white;
    padding: 0 7px;
  }
  // #rotationbox {
  //   height: 40vh;
  //   width: 100%;
  // }
  .detcontent {
    position: absolute;
    top: 0px;
    bottom: 49px;
    left: 0;
    right: 0;
    > .content > div:not(:first-child) {
      background: white;
      padding: 0 14px;
      margin-bottom: 20px;
    }
  }

  .yhui,
  .detlist > div {
    display: flex;
    padding: 20px 14px !important;

    > div:nth-child(2) > div {
      display: -webkit-box;
      margin-bottom: 5px;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      line-height: 20px;
      span {
        border: 1px solid red;
        color: red;
        font-size: 12px;
        margin-right: 5px;
      }
    }
  }
  .detlist {
    padding: 20px 14px !important;
    > div {
      padding: 0 !important;
    }
  }

  // .shopdet {
  //   display: flex;
  //   flex-wrap: wrap;
  //   > * {
  //     flex: 1;
  //   }
  // }
}

// .el-message-box__wrapper {
//   top: initial;
//   bottom: -20px;
// }
// .el-message-box {
//   width: 100%;
// }
.el-dialog {
  margin-top: 0 !important;
  margin: 0;
  top: 65vh;
}
.active {
  border-bottom: 1px solid red;
}
</style>

