/*
 * @Author: Mason
 * @Date: 2022-07-31 20:43:59
 * @LastEditors: Mason
 * @LastEditTime: 2022-08-01 13:28:32
 * @FilePath: /vite-project/src/router/index.ts
 */
import { App } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
];

// 创建一个 router 实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 导出安装
export async function setupRouter(app: App): Promise<void> {
  app.use(router);
}
