import { defineStore } from 'pinia'
import { getUserInfoByToken } from 'service/api'
import { getStoreKey,setTitle } from 'utils/tool'
const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
      userInfo: {}, // 用户信息
      openRouteList: [
        {
          path: '/dashboard/analysis',
          name: 'analysis',
          key: 'dashboard:analysis', // 是否缓存
          title: '数据中心',
          meta: {
            key: 'dashboard:analysis',
            requiresAuth: false, // 是否授权
            keepAlive: true, // 是否缓存
            title: '数据中心'
          }
        }
      ], //打开的路由
      currentRouteName: 'analysis',
      permissions: [] // 权限
    }
  },
  getters: {
    // token: (state) => state?.userInfo?.token ?? ''
  },
  actions: {
    addOpenRouteList(data, title) {
      const status = this.openRouteList.length
        ? this.openRouteList.some((item) => item.path === data.path)
        : false
      this.currentRouteName = data.name ?? 'analysis'
      setTitle(title)
      if (!this.openRouteList.length) {
        this.openRouteList.push({
          path: data.path,
          name: data.name,
          title: title,
          params: data.params,
          query: data.query,
          meta: data.meta
        })
      } else {
        if (!status) {
          this.openRouteList.push({
            path: data.path,
            name: data.name,
            title: title,
            params: data.params,
            query: data.query,
            meta: data.meta
          })
        }
      }
    },
    updateRouteName(data) {
      this.currentRouteName = data
    },
    updateOpenRouteList(data) {
      console.log('更新', data)
      this.openRouteList = data
    },
    clearAllTag() {
      if (this.openRouteList.length) {
        this.openRouteList = this.openRouteList.filter((item) => item.name === 'analysis')
        this.currentRouteName = 'analysis'
      }
    },
    // 移除当前页签
    removeCurrentTag() {
      this.openRouteList = this.openRouteList.filter((item) => item.name !== this.currentRouteName)
    },
    login(data) {
      // this.userInfo = data
      this.token = data
    },
    logout() {
      this.userInfo = {}
      this.token = ''
    },
    async getUserInfo(params = {}) {
      try {
        const res = await getUserInfoByToken(params)
        if (res?.code === 1) {
          const {
            id = '',
            username = '',
            password = '',
            name = '',
            avatar = '',
            roles = [],
            menu = []
          } = res?.data ?? {}
          this.userInfo = {
            id,
            username,
            password,
            name,
            avatar,
            roles
          }
          // 模拟删除权限
          this.permissions = menu
          // this.permissions = menu.filter((item) => item.key.includes('dashboard'))
          // this.permissions = []
        } else {
          this.userInfo = {}
          this.permissions = []
        }
        return Promise.resolve(res?.code === 1)
      } catch (error) {
        this.userInfo = {}
        this.permissions = []
        return Promise.reject(error)
      }
    }
  },
  persist: {
    // 修改存储中使用的键名称，默认为当前 Store的 id
    key: getStoreKey('user'),
    // 修改为 sessionStorage，默认为 localStorage
    // storage: window.sessionStorage,
    // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
    paths: ['openRouteList', 'userInfo', 'currentRouteName', 'token', 'permissions']
  }
})
export default useUserStore
