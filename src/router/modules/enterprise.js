import main from '@/views/main.vue'
export const enterpriseRouters = [
  {
    path: '/enterprise',
    name: 'enterprise',
    meta: {
      key: 'enterprise',
      requiresAuth: true,
      icon: 'ant-design:partition-outlined',
      title: '企业管理'
    },
    component: main,
    children: [
      {
        path: '/enterprise/employee',
        name: 'enterpriseEmployee',
        meta: {
          key: 'enterprise:employee',
          requiresAuth: true, // 是否授权
          keepAlive: true, // 是否缓存
          title: '员工管理'
        },
        component: () => import('@/views/enterprise/employee/index.vue')
      },
      {
        path: '/enterprise/role',
        name: 'enterpriseRole',
        meta: {
          key: 'enterprise:role',
          requiresAuth: true, // 是否授权
          keepAlive: true, // 是否缓存
          title: '角色管理'
        },
        component: () => import('@/views/enterprise/role/index.vue')
      },
      {
        path: '/enterprise/department',
        name: 'enterpriseDepartment',
        meta: {
          key: 'enterprise:department',
          requiresAuth: true, // 是否授权
          keepAlive: true, // 是否缓存
          title: '部门管理'
        },
        component: () => import('@/views/enterprise/department/index.vue')
      },
      {
        path: '/enterprise/information',
        name: 'enterpriseInformation',
        meta: {
          key: 'enterprise:information',
          requiresAuth: true, // 是否授权
          title: '企业信息'
        },
        component: () => import('@/views/enterprise/information/index.vue')
      }
    ]
  }
]
