/*
 * @Author: 聂芳 nie4161204@qq.com
 * @Date: 2023-02-20 14:10:30
 * @LastEditors: 聂芳 nie4161204@qq.com
 * @LastEditTime: 2023-02-20 16:33:07
 * @FilePath: /vue3-frog-admin/src/service/request.js
 * @Description:
 *
 */
import axios from './index'
export const get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export const post = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export const put = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .put(url, params)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export const del = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, params)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
