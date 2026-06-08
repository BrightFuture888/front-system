

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home/index.vue"),
    beforeEnter: (to: { name: any; }, from: any, next: () => void) => {
      const { name } = to;
      document.title = name;
      next();
    },
  },
  {
    path: "/pinia",
    name: "PiniaView",
    component: () => import("@/views/PiniaStateView/index.vue"),
    beforeEnter: (to: { name: any; }, from: any, next: () => void) => {
      const { name } = to;
      document.title = name;
      next();
    },
  },
  {
    path: "/aiChat",
    name: "AiChat",
    component: () => import("@/views/AiChat/index.vue"),
    beforeEnter: (to: { name: any; }, from: any, next: () => void) => {
      const { name } = to;
      document.title = name;
      next();
    },
  },
  {
    path: "/net-asset-value",
    name: "NetAssetValue",
    component: () => import("@/views/NetAssetValue/index.vue"),
    beforeEnter: (to: { name: any; }, from: any, next: () => void) => {
      const { name } = to;
      document.title = name;
      next();
    },
  },
];

export default routes;
