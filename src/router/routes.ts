import { accessRoutes } from "./access";

export const routes:{path: string,redirect?: string,name?: string, component?: any, meta?: any}[] = [

  {
    path: '/',
    redirect: '/entrance',
  },
  {
    path: '/entrance',
    name: 'entrance',
    component: () => import('@/view/Entrance/index.vue'),
  },
  ...accessRoutes,
  {
    path: '/401',
    name: '401',
    meta: { title: '401 - 未授权' },
    component: () => import('@/view/401.vue'),
  },
  {
    path: '/403',
    name: '403',
    meta: { title: '403 - 无权限' },
    component: () => import('@/view/403.vue'),
  },
  {
    path: '/404',
    name: '404',
    meta: { title: '404 - 页面不存在' },
    component: () => import('@/view/404.vue'),
  },
  {
    path: '/500',
    name: '500',
    meta: { title: '500 - 服务器错误' },
    component: () => import('@/view/500.vue'),
  },
]

export default routes