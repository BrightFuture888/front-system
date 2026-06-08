import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { loadEnv } from "vite";
import { resolve } from "path";
import UnoCSS from "unocss/vite";

import qiankun from "vite-plugin-qiankun";

const { VITE_HOST, VITE_PORT } = loadEnv(".env", process.cwd()); //第一种方法

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    qiankun("vite-vue", {
      useDevMode: true,
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: Number(VITE_PORT),
    host: VITE_HOST,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ["vue"],
          "vue-router": ["vue-router"],
        },
      },
    },
  },
});
