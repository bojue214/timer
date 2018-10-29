//依赖
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 组件
import store from './vuex/store';
import router from './router';
import i18n from './i18n/i18n'

// 插件
import validator from './plugins/validator';
import storage from './plugins/storage';

import App from './App';

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.use(validator);
Vue.use(storage);

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  i18n,
  store,
  router,
  render: h => h(App)
});
