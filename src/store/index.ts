/*
 * @Author: Mason
 * @Date: 2022-06-30 17:29:36
 * @LastEditors: Mason
 * @LastEditTime: 2022-08-01 21:31:28
 * @FilePath: /vite-project/src/store/index.ts
 */
import { createPinia } from "pinia";
// 数据持久化插件
import piniaPersist from "pinia-plugin-persist";
import type { App } from "vue";

const store = createPinia();

store.use(piniaPersist);

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
