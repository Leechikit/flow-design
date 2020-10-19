/*
 * @Description: 
 * @Autor: Lizijie
 * @Date: 2020-10-19 17:12:23
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-10-19 17:29:45
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: '/flow-design'
  },
  {
    path: '/flow-design',
    name: 'flow-design',
    component: () => import('@/views/flow-design/index.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;
