/*
 * @Author: 聂芳 nie4161204@qq.com
 * @Date: 2023-02-20 12:07:25
 * @LastEditors: 聂芳 nie4161204@qq.com
 * @LastEditTime: 2023-09-29 07:46:12
 * @FilePath: /vue3-frog-admin/src/service/index.js
 * @Description: 拦截器
 *
 */
import axios from 'axios'
import router from '@/router'
import useStore from 'store'
import { message } from 'ant-design-vue'
const { user } = useStore()
const isDev = true
/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, msg) => {
  // 状态码判断
  switch (status) {
    case 302:
      message.error(msg || '接口重定向了！')
      break
    case 400:
      message.error(msg || '发出的请求有错误，服务器没有进行新建或修改数据的操作')
      break
    // 401: 未登录
    // 未登录则跳转登录页面，并携带当前页面的路径
    // 在登录成功后返回当前页面，这一步需要在登录页操作。
    case 401: //重定向
      /* message.error('token:登录失效' + status + ':' + store.state.Roles)
      storage.remove(store.state.Roles)
      storage.get(store.state.Roles) */
      message.error(msg || '登录失效')
      router.replace({
        path: '/login'
      })
      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      message.error(msg || '登录过期,用户得到授权，但是访问是被禁止的')
      // store.commit('token', null);
      setTimeout(() => {
        router.replace({
          path: '/login'
        })
      }, 1000)
      break
    case 404:
      message.error(msg || '网络请求不存在')
      break
    case 406:
      message.error(msg || '请求的格式不可得')
      break
    case 408:
      message.error(msg || ' 请求超时！')
      break
    case 410:
      message.error(msg || '请求的资源被永久删除，且不会再得到的')
      break
    case 422:
      message.error(msg || '当创建一个对象时，发生一个验证错误')
      break
    case 500:
      message.error(msg || '服务器发生错误，请检查服务器')
      break
    case 502:
      message.error(msg || '网关错误')
      break
    case 503:
      message.error(msg || '服务不可用，服务器暂时过载或维护')
      break
    case 504:
      message.error(msg || '网关超时')
      break
    default:
      message.error(msg || '其他错误错误')
  }
}

// 取消重复请求
const pending = []
const CancelToken = axios.CancelToken
// 移除重复请求
const removePending = (config) => {
  for (const key in pending) {
    const item = +key
    const list = pending[key]
    // 当前请求在数组中存在时执行函数体
    if (
      list.url === config.url &&
      list.method === config.method &&
      JSON.stringify(list.params) === JSON.stringify(config.params) &&
      JSON.stringify(list.data) === JSON.stringify(config.data)
    ) {
      // 执行取消操作
      list.cancel('操作太频繁，请稍后再试')
      // 从数组中移除记录
      pending.splice(item, 1)
    }
  }
}
const instance = axios.create({
  baseURL: isDev ? 'http://127.0.0.1:7001' : 'http://8.134.102.191:7001', //'http://127.0.0.1:7001',
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin-Type': '*'
  }
})
// 请求数据拦截
instance.interceptors.request.use(
  (config) => {
    const token = user.userInfo.token
    if (token) {
      config.headers['Authorization'] = token
    }
    removePending(config)
    // console.log('方法', config.data)
    // if (config.method === 'post') {
    //   config.data = Qs.stringify(config.data, { allowDots: true })
    // }
    config.cancelToken = new CancelToken((c) => {
      pending.push({
        url: config.url,
        method: config.method,
        params: config.params,
        data: config.data,
        cancel: c
      })
    })
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    // const token = store.state.token;
    // localStorage.setItem('token', token);

    /* if (storage.get(store.state.Roles)) {
      store.state.Roles
      config.headers.Authorization = storage.get(store.state.Roles)
    } */
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 返回响应数据拦截
instance.interceptors.response.use(
  (res) => {
    removePending(res.config)
    if (res.status === 200 || res.status === 201) {
      if (res.data && res.data.code === 401) {
        router.replace({
          path: '/login'
        })
        return Promise.resolve(res.data)
      }
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res.data)
    }
  },
  (error) => {
    // 请求失败
    const { response } = error
    if (response) {
      console.log('请求失败', response.data.msg)
      errorHandle(response.status, response.data.msg)

      // 超时重新请求
      /* const config = error.config
      // 全局的请求次数,请求的间隙
      const [RETRY_COUNT, RETRY_DELAY] = [3, 1000]

      if (config && RETRY_COUNT) {
        // 设置用于跟踪重试计数的变量
        config.__retryCount = config.__retryCount || 0
        // 检查是否已经把重试的总数用完
        if (config.__retryCount >= RETRY_COUNT) {
          return Promise.reject(response || { message: error.message })
        }
        // 增加重试计数
        config.__retryCount++
        // 创造新的Promise来处理指数后退
        const backoff = new Promise((resolve) => {
          setTimeout(() => {
            resolve()
          }, RETRY_DELAY || 1)
        })
        // instance重试请求的Promise
        return backoff.then(() => {
          return instance(config)
        })
      } */

      return Promise.reject(response.data)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 后续增加断网情况下做的一些操作
      /* store.commit('networkState', false) */
    }
    return Promise.reject(response ? response.data : error)
  }
)
// 只需要考虑单一职责，这块只封装axios
export default instance
