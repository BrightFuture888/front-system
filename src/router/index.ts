import {
  createRouter,
  createWebHistory,
  // createWebHashHistory,
} from "vue-router";

import routes from "./routes";
import {
  renderWithQiankun,
  qiankunWindow,
  QiankunProps,
} from "vite-plugin-qiankun/dist/helper";
const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(
    !qiankunWindow.__POWERED_BY_QIANKUN__ ? "" : "/application-one",
  ),
  routes,
});

export default router;
