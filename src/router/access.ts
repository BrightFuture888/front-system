export const accessRoutes = [
  {
    path: '/application-one',
    name: 'applicationOne',
    meta: {
      isMicroAppRoute: true,
      title: 'Vue App'
    },
    component: () => import('@/view/ApplicationOne/index.vue'),
  },
  // {
  //   path: '/umi-react-template',
  //   name: 'umiReactTemplate',
  //   meta: {
  //     isMicroAppRoute: true,
  //     title: 'Umi React Template'
  //   },
  //   component: () => import('@/view/ApplicationTwo/index.vue'),
  // },
]