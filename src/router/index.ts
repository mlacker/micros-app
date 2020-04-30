import Vue from 'vue'
import VueRouter from 'vue-router'
import { authGuard } from '../auth/authGuard'

import Home from '../views/Home.vue'
import Profile from '../views/auth/Profile.vue'
import FormDesignList from '../views/design/FormDesignList.vue'
import FormDesign from '../views/design/FormDesign.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter: authGuard
  },
  {
    path: '/form-design-list',
    name: 'FormDesignList',
    component: FormDesignList
  },
  {
    path: '/form-design',
    name: 'FormDesign',
    component: FormDesign
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
