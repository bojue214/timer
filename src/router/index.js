import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login'
import language from '@/components/language'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'login' },
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/language',
      name: 'language',
      component: language,
    },
  ]
});
