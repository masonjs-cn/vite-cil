/*
 * @Author: Mason
 * @Date: 2022-07-30 22:49:09
 * @LastEditors: Mason
 * @LastEditTime: 2022-08-01 22:06:00
 * @FilePath: /vite-project/src/main.ts
 */
import { createApp } from "vue";
import App from "./App.vue";
import { setupRouter } from "./router";
import { setupStore } from "./store/index";

const app = createApp(App);

function setupApp() {
  // 配置路由
  setupRouter(app);
  // 配置 pinia
  setupStore(app);
  app.mount("#app");
}

setupApp();
