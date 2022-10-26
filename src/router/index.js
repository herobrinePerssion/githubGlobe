/*
 * @Author: arron Zhu
 * @Date: 2022-10-26 11:26:21
 * @lastEditor: arron Zhu
 * @LastEditTime: 2022-10-26 11:40:11
 * @Description: 
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
  },
]

const router = new VueRouter({
  routes
})

export default router
