import main from '@/views/main.vue'
export const accountRouters = [
  {
    path: '/account',
    name: 'account',
    // redirect: '/account/settings',
    meta: {
      key: 'account',
      requiresAuth: true,
      notMenu: true, // 是否显示在左侧菜单
      notTag: false, // 是否显示在tag菜单
      title: '个人中心'
    },
    component: main,
    children: [
      {
        path: '/account/settings',
        name: 'accountSettings',
        meta: {
          key: 'account:settings',
          requiresAuth: true, // 是否授权
          keepAlive: true, // 是否缓存,
          title: '个人中心设置'
        },
        component: () => import('@/views/account/settings/index.vue')
      }
    ]
  }
]
