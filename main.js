import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import './assets/global.css';
import axios from "axios";
import VueRouter from 'vue-router';
import router from './router';
import 'process/browser';
import store from './store'
import i18n from "./i18n";
import "@/assets/scss/style.scss";



Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(store)

new Vue({
  i18n,
  router,
  el: '#app',
  store: store,
  render: h => h(App)
}).$mount('#app');
