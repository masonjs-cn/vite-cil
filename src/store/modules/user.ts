/*
 * @Author: Mason
 * @Date: 2022-06-30 17:32:46
 * @LastEditors: Mason
 * @LastEditTime: 2022-08-01 22:05:02
 * @FilePath: /vite-project/src/store/modules/user.ts
 */

import { defineStore } from "pinia";
import { store } from "../index";

interface IUserState {
  username: string | null;
}

export const useUserStore = defineStore({
  id: "user",
  state: (): IUserState => ({
    username: null,
  }),
  getters: {
    getUsername(): string | null {
      return this.username;
    },
  },
  // 数据持久化配置
  persist: {
    enabled: true, // 开启存储
    // strategies: 指定存储位置以及存储的变量
    // 该属性可以不写，不写的话默认是存储到sessionStorage里边
    // 默认存储state里边的所有数据
    strategies: [
      { storage: localStorage, paths: ["username"] },
      // storage 存储到哪里 sessionStorage/localStorage
      // paths是数组，要存储缓存的变量，也可以写多个变量
      // paths如果不写，那么默认存储就是state里边的所有数据
    ],
  },
  actions: {
    SET_USERNAME(payload: string) {
      this.username = payload;
    },
    // 初始化state
    clear() {
      this.$reset();
    },
  },
});

// 在组件setup函数外使用
export function useUserStoreWithOut() {
  return useUserStore(store);
}
