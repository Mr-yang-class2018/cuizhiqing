<template>
  <div id="addaddress">
    <navbar class="home-nav-bar" v-if="$store.state.isshow==true">
      <div slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">{{$route.params.did==0?'添加收货地址':'编辑收货地址'}}</div>
    </navbar>
    <div :class="$store.state.isshow==false?'addsty':''">
      <span>收货人</span>
      <input type="text" v-model="name" />
    </div>
    <div>
      <span>联系方式</span>
      <span style="flex:1;">+86</span>
      <i style="flex:1;" class="el-icon-arrow-down"></i>
      <input type="text" style="flex:5" v-model="tel" />
    </div>
    <div class="sinArea">
      <span>所在地区</span>
      <el-button type="text" @click="dialogVisible2 =true" v-model="area">
        {{area?area:'请选择地区'}}
        <div class="el-icon-arrow-right"></div>
      </el-button>
      <el-dialog title="所在地区" :visible.sync="dialogVisible2" width="100%">
        <div>
          <div style="border-top:1px solid #ddd;">
            <span
              :class="index==num?'active':''"
              @click="num=index"
              v-for="(i,index) in ['中国大陆','港澳台及海外']"
              :key="index"
            >{{i}}</span>
          </div>
          <!-- <el-tabs v-model="activeName" @tab-click="handleClick" style="border-top:1px solid #ddd;">
            <el-tab-pane :label="area.split(',')[0]" name="first">
              <scroll class="addScroll">
                <ul>
                  <li
                    v-for="(item,index) in prov"
                    :key="index"
                    @click="getcity(item.provinceid)"
                  >{{item.province}}</li>
                </ul>
              </scroll>
            </el-tab-pane>
            <el-tab-pane :label="area.split(',')[1]" name="second">
              <scroll class="addScroll">
                <ul>
                  <li
                    v-for="(item,index) in city"
                    :key="index"
                    @click="getarea(item.cityid)"
                  >{{item.city}}</li>
                </ul>
              </scroll>
            </el-tab-pane>
            <el-tab-pane :label="area.split(',')[2]" name="third">
              <scroll class="addScroll">
                <ul>
                  <li v-for="(item,index) in areaAll" :key="index">{{item.area}}</li>
                </ul>
              </scroll>
            </el-tab-pane>
          </el-tabs>-->

          <el-tabs v-model="editableTabsValue">
            <el-tab-pane
              v-for="item in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >
              <scroll class="addScroll" :probeType="3" :pull-up-load="true">
                <p v-for="i in item.content" :key="i.id" @click="getcity(item,i)">{{i[item.type]}}</p>
              </scroll>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-dialog>

      <!-- <input type="text"  v-model="area" /> -->
    </div>
    <div>
      <span>详细地址</span>
      <textarea name id cols="30" rows="10"></textarea>
    </div>
    <div class="addresstag">
      <span>地址标签</span>
      <el-button
        type="default"
        round
        v-for="(val,index) in takeoverArr"
        :key="index"
        @click="setTakeover(val,index)"
      >{{val}}</el-button>
      <el-button
        type="default"
        round
        @click="dialogVisible = true"
        v-if="takeoverArr.length!=4"
      >自定义+</el-button>
      <el-button
        class="el-icon-edit-outline"
        v-if="takeoverArr.length==4"
        @click="dialogVisible = true"
      ></el-button>
      <el-dialog title="自定义标签名称" :visible.sync="dialogVisible" width="90%">
        <input type="text" v-model="tagnew" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="takeoverArr.length==4?xiugai():addTag()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div>
      <span>只能识别地址</span>
    </div>
    <div v-if="$route.params.did!=0">
      <p>设置默认地址</p>
    </div>
    <el-button
      type="danger"
      class="addr_btn"
      v-if="$route.params.did==0"
      @click="addaddrEv()"
    >保存并使用该地址</el-button>
    <el-button type="danger" class="addr_btn" v-if="$route.params.did!=0" @click="confirmAddr">确认</el-button>
    <el-button class="addr_btn" v-if="$route.params.did!=0" @click="deaddr">删除收货地址</el-button>
  </div>
</template>

<script>
import {
  addAddr,
  updatedefadddet,
  getOneprov,
  getarea,
  getOnecity,
  deletaddr,
} from "network/address";
import navbar from "components/common/navbar/navbar.vue";
import scroll from "components/content/scroll/scroll";
export default {
  name: "addaddress",
  data() {
    return {
      name: "",
      tel: "",
      area: "",
      id: null,
      obj: null,
      tagnew: "",
      num: 0,
      activeName: "third",
      dialogVisible2: false,
      dialogVisible: false,
      takeoverArr: ["家", "学校", "公司"],
      areaAll: [],
      areaarr: ["province", "city", "area"],
      active: 0,
      tag: "",
      // ------
      editableTabsValue: "0",
      editableTabs: [
        {
          title: "请选择",
          name: "0",
          type: "province",
          content: "Tab 1 content",
        },
      ],
      tabIndex: 0,
    };
  },
  components: {
    navbar,
    scroll,
  },
  created() {
    this.getonecity();
    if (this.$route.params.did != 0) {
      this.obj = JSON.parse(this.$route.params.did);
      console.log(this.obj);
      // this.updateaddrdet();
      this.name = this.obj.takeover_name;
      this.tel = this.obj.takeover_tel;
      this.area = this.obj.takeover_addr;
      this.id = this.obj.address_id;
      // this.getcity()
    }
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    deaddr() {
      deletaddr({ address_id: this.obj.id }).then((res) => {
        console.log(res);
      });
    },
    xiugai() {
      this.dialogVisible = false;

      this.takeoverArr[this.takeoverArr.length - 1] = this.tagnew;
    },
    addTag() {
      this.dialogVisible = false;
      this.takeoverArr.push(this.tagnew);
    },
    setTakeover(val, index) {
      if (this.$route.params.did == 0) {
        this.tag = val;
      } else {
        if (val == this.obj.tag) {
          this.obj.tag = "";
          this.active = "-1";
          return;
        }
        this.active = index;
        this.obj.tag = val;
      }
    },
    getcity(obj, temp) {
      console.log(obj, temp);
      this.editableTabs[obj.name].title = temp[obj.type];
      // 创建下一个按钮的active值
      let newActive = obj.name * 1 + 1 + "";
      if (newActive < 3) {
        //每次选择的时候，都会从新截取一下选中值 之前的数据
        this.editableTabs = this.editableTabs.slice(0, obj.name + 1);
        //添加下一个选项按钮
        this.editableTabs.push({
          title: "请选择",
          name: newActive,
          type: this.areaarr[newActive],
          content: "",
        });
        this.editableTabsValue = newActive;
        if (newActive == 1) this.getOnecity({ provinceid: temp.provinceid });
        if (newActive == 2) this.getarea({ cityid: temp.cityid });
      }
      if (newActive == 3) {
        alert("kkk");
        this.dialogVisible2 = false;
        this.area = [];
        //取出选项卡按钮上的值，拼接起来
        this.editableTabs.forEach((item) => {
          this.area += item.title;
        });
      }
      console.log(this.editableTabs);
    },

    getOnecity(data) {
      getOnecity(data).then((res) => {
        this.editableTabs[1].content = res.data;
      });
    },
    getarea(data) {
      getarea(data).then((res) => {
        this.editableTabs[2].content = res.data;
      });
      console.log(this.editableTabs);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    addaddrEv() {
      addAddr({
        user_id: this.$store.state.userinfo.id,
        takeover_tel: this.tel,
        takeover_name: this.name,
        takeover_addr: this.area,
        takeover_label:this.tag
      }).then((res) => {
        console.log(res);
        // if (this.$store.state.addrAll.length) {
        //   updatedefadd({ address_id: res }).then((res) => {
        //     console.log(res);
        //   });
        // }
      });
      this.$router.push(
        "/confirmorder/" + JSON.stringify(this.$store.state.paymentgoods)
      );
    },
    confirmAddr() {
      this.obj.takeover_name = this.name;
      this.obj.takeover_tel = this.tel;
      this.obj.takeover_addr = this.area;
      this.obj.address_id = this.id;
      updatedefadddet(this.obj).then((res) => {
        console.log(res);
      });
      this.$store.state.changeAddr.takeover_name = this.name;
      this.$store.state.changeAddr.takeover_tel = this.tel;
      this.$store.state.changeAddr.takeover_addr = this.area;
      this.$router.push(
        "/confirmorder/" + JSON.stringify(this.$store.state.paymentgoods)
      );
    },
    getonecity() {
      getOneprov().then((res) => {
        console.log(res);
        this.editableTabs[0].content = res.data;
      });
    },
  },
};
</script>
<style lang='less'>
#addaddress {
  .addsty {
    border: 1px solid #f7f7f7;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    > span {
      flex: 2;
      text-align: left;
    }
    input {
      flex: 5;
    }
  }
  font-size: 14px;
  > div:not(:first-child) {
    border: 1px solid #f7f7f7;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    > span {
      text-align: left;
      flex: 2;
    }
    > div,
    > input {
      flex: 5;
    }
  }
  .el-icon-arrow-right:before {
    float: right;
  }
  input[type="text"] {
    border: none;
    &:focus {
      outline: none;
      outline-offset: 0px;
    }
  }
  .sinArea {
    .el-dialog__body {
      padding-top: 0;
      > div {
        > div {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          span {
            padding: 10px 0;

            &:first-child {
              margin-right: 10px;
            }
          }
        }

        .active {
          border-bottom: 1px solid red;
        }
      }
    }
  }
  .addScroll {
    width: 100%;
    height: 50vh;
    overflow: hidden;
    // float: left;
    .content {
      width: 100%;
      > ul {
        width: 100%;
        li {
          padding: 10px 0;
          text-align: left;
        }
      }
    }
  }
  .el-dialog {
    position: absolute;
    bottom: 0;
    margin-bottom: 0;
  }
  .el-tabs__header.is-top {
    width: 100%;
  }
  .addresstag {
    .el-dialog {
      position: relative;
    }
  }
  .dialog-footer .el-button {
    width: 30%;
  }
  .el-icon-edit-outline:before {
    margin: 10% 10px 0;
  }
}
.addr_btn {
  margin: 10px 0;
  margin: 4%;
  width: 92%;
  border-radius: 20px;
}
</style>
