<template>
  <div id="phb" >
    <phbtopbot>
      <div class="hxgd">
        <scroll class="one1 fl" ref="one1" v-if="!down"  >
          <tabcontrol :cont="false"
            :controlid="tabcontrolid"
            :titlearr="jd_category_one"
            @tabclick="tabcontrolclick"
            ref="categorycontrol"
            direction="transverse"
          ></tabcontrol>
        </scroll>
        <p v-if="down" class="fl jx">为你精选以下标签</p>
        <el-button type="text" @click="open" icon="el-icon-arrow-down"></el-button>
      </div>
    </phbtopbot>
  </div>
</template>

<script>
import tabcontrol from "components/content/tabControll/tabControl";
import scroll from "components/content/scroll/scroll";
import phbtopbot from "components/content/phbTopHot/phbTopHot";
import { get_jd_category_one } from "network/category";
export default {
  name: "phbhot",
  data() {
    return {
      tabcontrolid: "phbcontroll",
      jd_category_one: [],
      down: false
    };
  },
  components: {
    tabcontrol,
    phbtopbot,
    scroll
  },
    beforeRouteEnter(to, from, next) {
    next((vm) => {
      if ((to.path == "/phbhot")) {
        vm.$root.$children[0].page4='false'
      }
    });
  },
  created() {
    this.get_jd_category_one();
  },
  methods: {
    tabcontrolclick(index) {
      console.log(index);
    },
    get_jd_category_one() {
      get_jd_category_one().then(res => {
        if (res.data) this.jd_category_one.push(...res.data);
      });
    },
    open() {
      this.down = !this.down;
      this.$alert("<strong>这是 <i>HTML</i> 片段</strong>", "HTML 片段", {
        dangerouslyUseHTMLString: true,
        closeOnClickModal: true
      });
    }
  }
};
</script>


