import main from '@/views/main.vue'
export const systemRouters = [
  {
    path: '/system',
    name: 'system',
    key: 'system',
    // redirect: '/system/list',
    icon: 'ant-design:setting-outlined',
    meta: {
      key: 'system',
      requiresAuth: true,
      icon: 'ant-design:setting-outlined',
      title: '系统设置'
    },
    component: main,
    children: [
      {
        path: '/system/menu',
        name: 'menu',
        key: 'system:menu',
        meta: {
          key: 'system:menu',
          requiresAuth: true, // 是否授权
          keepAlive: true, // 是否缓存
          title: '菜单管理'
        },
        component: () => import('@/views/system/menu/index.vue')
      },
      {
        path: '/system/menuGroup',
        name: 'menuGroup',
        key: 'system:menuGroup',
        meta: {
          key: 'system:menuGroup',
          requiresAuth: true, // 是否授权
          keepAlive: true, // 是否缓存
          title: '菜单组管理'
        },
        component: () => import('@/views/system/menu-group/index.vue')
      }
    ]
  }
]
