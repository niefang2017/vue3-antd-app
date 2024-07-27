/*
 * @Author: 聂芳 nie4161204@qq.com
 * @Date: 2023-02-20 17:02:31
 * @LastEditors: 聂芳 nie4161204@qq.com
 * @LastEditTime: 2024-04-06 21:38:30
 * @FilePath: /vue3-frog-admin/src/service/constants/gushi.js
 * @Description: 启蒙
 *
 */
import { del, get, post, put } from '../request'
/**
 * @description: 新增古诗
 * @param {*} params
 * @return {*}
 */
export const createGushi = (params) => {
  return post('/api/admin/gushis', params)
}
/**
 * @description: 查询古诗列表
 * @param {*} params
 * @return {*}
 */
export const getGushiList = (params) => {
  return post('/api/admin/gushis/page', params)
}
/**
 * @description: 根据id查询古诗
 * @param {*} params
 * @return {*}
 */
export const getGushiById = (id) => {
  return get(`/api/admin/gushis/${id}`)
}
/**
 * @description: 根据id删除古诗
 * @param {*} params
 * @return {*}
 */
export const delteGushiById = (id) => {
  return del(`/api/admin/gushis/${id}`)
}
/**
 * @description: 根据id更新古诗
 * @param {*} params
 * @return {*}
 */
export const updateGushiById = (id, params) => {
  return put(`/api/admin/gushis/${id}`, params)
}
