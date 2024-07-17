/*
 * @Author: 聂芳 nie4161204@qq.com
 * @Date: 2022-10-12 18:01:11
 * @LastEditors: 聂芳 nie4161204@qq.com
 * @LastEditTime: 2023-03-01 13:57:10
 * @FilePath: /vue3-frog-admin/src/store/common.js
 * @Description: 公用module
 *
 */
import { defineStore } from 'pinia'
const useCommonStore = defineStore('common', {
  state: () => {
    return {
      locale: 'zh-cn', // en
      theme: ''
    }
  },
  getters: {
    i18nLocal() {
      return this.locale !== 'zh-cn' ? 'en-US' : 'zh-CN'
    }
  },
  actions: {
    changeLocal(value) {
      this.locale = value
    },
    changeTheme(value) {
      console.log('change', value)
      this.theme = value === 'dark' ? 'dark' : 'light'
    }
  },
  // 所有数据持久化
  persist: true
  // 持久化存储插件其他配置
  // persist: {
  //   // 修改存储中使用的键名称，默认为当前 Store的 id
  //   // key: 'storekey',
  //   // 修改为 sessionStorage，默认为 localStorage
  //   storage: window.sessionStorage,
  //   // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
  //   paths: ['nested.data'],
  // },
})

export default useCommonStore
