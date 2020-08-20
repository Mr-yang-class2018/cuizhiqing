import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)
// 定义一个全局可以使用的$bus总线，需要通过原型为vue添加一个总线属性
Vue.prototype.$bus = new Vue();

Vue.prototype.pushrouper = (path) => {
  router.push(path)
}
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})


