<!--
 * @Author: Mason
 * @Date: 2022-07-30 22:49:09
 * @LastEditors: Mason
 * @LastEditTime: 2022-08-08 00:01:20
 * @FilePath: /vite-cil/src/App.vue
-->
<template>
  <n-message-provider>
    <n-menu
      v-model:value="activeKey"
      mode="horizontal"
      :options="menuOptions"
    />

    <n-layout has-sider>
      <n-layout-sider content-style="padding: 24px;"> 海淀桥 </n-layout-sider>
      <n-layout>
        <n-layout-header>颐和园路</n-layout-header>
        <n-layout-content content-style="padding: 24px;">
          <router-view />
        </n-layout-content>
        <n-layout-footer>成府路</n-layout-footer>
      </n-layout>
    </n-layout>
  </n-message-provider>
</template>

<script lang="ts" setup>
import type { MenuOption } from "naive-ui";
import { RouterLink } from "vue-router";
import { useUserStore } from "./store/modules/user";

const options: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "Home",
            params: {
              lang: "zh-CN",
            },
          },
        },
        { default: () => "Home" }
      ),
    key: "hear-the-wind-sing",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "About",
            params: {
              lang: "zh-CN",
            },
          },
        },
        { default: () => "About" }
      ),
    key: "a-wild-sheep-chase",
  },
];

const activeKey = ref<string | null>(null);
const menuOptions = reactive(options);

// 实例化使用userStore
const users = useUserStore();

// 存储数据
users.SET_USERNAME("user");
console.log(12);
</script>

<style scoped>
.n-layout-header,
.n-layout-footer {
  background: rgba(128, 128, 128, 0.2);
  padding: 24px;
}

.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}

.n-layout-content {
  background: rgba(128, 128, 128, 0.4);
}
</style>
