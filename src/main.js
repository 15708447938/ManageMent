import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from "./router/router"
import echarts from "echarts"
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI)
Vue.config.productionTip = false
//创建一个全局bus
Vue.prototype.$bus=new Vue();

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')