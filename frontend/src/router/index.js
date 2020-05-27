import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/login.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Dashboard',
    meta: {layout : 'Dashboard'},
    component: Dashboard
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout : 'LoginAndRegister'},
    component: () => import(/* webpackChunkName: "about" */ '../views/register.vue')
  },
    {
      path: '/register',
      name: 'register',
      meta: {layout : 'LoginAndRegister'},
      component: () => import(/* webpackChunkName: "about" */ '../views/register.vue'),
    }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
