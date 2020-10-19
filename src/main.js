/*
 * @Description: 
 * @Autor: Lizijie
 * @Date: 2020-10-19 17:12:23
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-10-19 17:26:54
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUi from 'element-ui'
import '@/assets/theme/style.scss'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false;
Vue.use(ElementUi, { size: 'small' })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
