import { defineConfig } from "@umijs/max";

export default defineConfig({
  qiankun: {
    slave: {},
  },
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: "Ai",
  },
  routes: [
    {
      path: "/",
      redirect: "/chat",
    },
    {
      name: "对话框",
      path: "/chat",
      component: "./Chat",
    },
  ],

  npmClient: "pnpm",
  tailwindcss: {},
});
