# vue3-antd-app

This template should help get you started developing with Vue 3 in Vite.
node >=18 (v18.20.4)

```sh
npm i -g pnpm
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### 工具

数字计算：[number-precision](https://www.npmjs.com/package/number-precision)

composable: [vueuse](https://vueuse.org/)

table: [vxetable](https://vxetable.cn/v3/#/table/api)

原子化css：[unocss](https://unocss.dev/).

图标级：[icones](https://icones.js.org/).

```vue
<!-- antd图标 -->
<i class="i-antd:down" />
<!-- mdi -->
<i class="i-mdi:account-circle" />
<!-- mdi -->
<i class="i-carbon:3d-cursor" />
```

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

### 目录

```bash

├─.husky
│ └─\_
├─.vscode
├─public                    # 出口
└─src                       # 代码
  └─assets                  # 静态资源
  │  └─svg                  # 本地svg目录
  ├─components              # 公用组件
  │  ├─submenu              # 子菜单
  │  ├─Icon                 # svg和icons图标组件
  │  └─__tests__            # test
  ├─constants               # 公用常量
  ├─hooks                   # 公用hooks
  │  └─useDesign.js         # 请求
  │  └─usePagination.js     # 分页
  ├─layout                  # layout
  ├─router                  # 路由
  │  └─modules              # 路由模块
  ├─service                 #
  │  └─constants            # api所有文件常量列表
  │     └─user.js           # user相关api
  │  └─api.js               # 公用api出口
  │  └─request.js           # 请求
  ├─stores
  │  └─common.js            # 全局公用store
  │  └─user.js              # user store
  │  └─index.js             # store 出口
  ├─utils                   # 自定义工具
  └─views                   # 总页面目录
      ├─account             # 个人中心
      │  └─settings
      ├─analysis            # 数据中心
      ├─login               # 登录页
      └─system              # 系统设置
          ├─menu
          └─role
```

### 代码 commit

```sh
# 提交类型
{"feat", // 新增功能
"fix", // 修复缺陷
"docs", // 文档变更
"style", // 代码格式（不影响功能，例如空格、分号等格式修正）
"refactor", // 代码重构（不包括 bug 修复、功能新增）
"perf", // 性能优化
"test", // 添加疏漏测试或已有测试改动
"build", // 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）
"ci", // 修改 CI 配置、脚本
"revert", // 回滚 commit
"chore", // 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）
}
# 示例
git commit -m 'feat: 新增模块xxx'
```

### router

```js
export const accountRouters = [
  {
    path: '/account',
    name: 'account',
    meta: {
      key: 'account', // 必填
      requiresAuth: true, // 是否授权
      notMenu: true, // 是否显示在左侧菜单
      // notTag: false, // 是否显示在tag菜单
      title: '个人中心'
    },
    component: main,
    children: [
      {
        path: 'settings',
        name: 'settings',
        meta: {
          key: 'account:settings', // 必填
          requiresAuth: true, // 是否授权
          keepAlive: true, // 是否缓存,
          title: '个人中心设置'
        },
        component: () => import('@/views/account/settings/index.vue')
      }
    ]
  }
]
```
