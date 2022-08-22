/*
 * @Author: Mason
 * @Date: 2022-07-30 22:49:09
 * @LastEditors: Mason
 * @LastEditTime: 2022-08-05 09:05:19
 * @FilePath: /vite-project/vite.config.ts
 */
import vue from "@vitejs/plugin-vue";
import { loadEnv } from "vite";
// 当引入 "unplugin-vue-components/vite 组件之后，页面中需要引入组件的地方就都不需要引入了
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import DefineOptions from "unplugin-vue-define-options/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import type { UserConfig, ConfigEnv } from "vite";
import viteCompression from "vite-plugin-compression";
import { createHtmlPlugin } from "vite-plugin-html";
import config from "./config/index";

const CWD = process.cwd();
export default ({ mode }: ConfigEnv): UserConfig => {
  const { VITE_NODE_ENV, VUE_APP_FETCH_BASE_URL } = loadEnv(mode, CWD);
  const isProd = ["development", "test", "production"].includes(VITE_NODE_ENV);

  return {
    // 打包路径
    base: config.publicPath,
    plugins: [
      vue(),
      createHtmlPlugin({
        minify: true, // 是否压缩 html
        /**
         * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
         * @default src/main.ts
         */
        entry: "src/main.ts",
        /**
         * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
         * @default index.html
         */
        // 例如: "public/index.html"
        template: "/index.html",
        inject: {
          data: {
            title: config.title,
            injectScript: config.oepnCDN ? "" : "",
          },
        },
      }),
      DefineOptions(),
      AutoImport({
        imports: [
          "vue",
          "vue-router",
          "pinia",
          {
            "naive-ui": [
              "useDialog",
              "useMessage",
              "useNotification",
              "useLoadingBar",
            ],
          },
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
      // gzip压缩 生产环境生成 .gz 文件
      config.zip
        ? viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: "gzip",
            ext: ".gz",
          })
        : {},
    ],
    // 设置别名
    resolve: {
      alias: [
        {
          find: "@",
          replacement: "/src",
        },
      ],
    },
    // 启动服务配置
    server: {
      host: "0.0.0.0",
      port: 8000,
      open: true,
      https: false,
      proxy: {
        "/api/v1": {
          target: VUE_APP_FETCH_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    // 去除 console debugger
    esbuild: {
      pure: isProd ? ["console.log", "debugger"] : [],
    },
    // 生产环境打包配置
    build: {
      target: "es2015", // 浏览器兼容性
      cssTarget: "chrome79", // 此选项允许用户为 CSS 的压缩设置一个不同的浏览器 target
      chunkSizeWarningLimit: 2000, // chunk 大小警告的限制（以 kbs 为单位）。
      outDir: config.outputDir || "dist", // 指定输出路径
      assetsDir: config.assetsDir || "static", // 指定生成静态资源的存放路径（相对于 build.outDir）。
      manifest: false, // 当设置为 true，构建后将会生成 manifest.json 文件，包含了没有被 hash 的资源文件名和 hash 后版本的映射。可以为一些服务器框架渲染时提供正确的资源引入链接。
    },
  };
};
