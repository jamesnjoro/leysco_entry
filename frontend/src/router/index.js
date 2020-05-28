import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/dashboard.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'dashboard',
    meta: {layout : 'Dashboard', auth:true},
    component: Dashboard
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout : 'LoginAndRegister'},
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
    {
      path: '/register',
      name: 'register',
      meta: {layout : 'LoginAndRegister'},
      component: () => import(/* webpackChunkName: "about" */ '../views/register.vue'),
    },
    {
      path: '/users',
      name: 'users',
      meta: {layout : 'Dashboard', auth:true},
      component: () => import(/* webpackChunkName: "about" */ '../views/users.vue')
    },
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
