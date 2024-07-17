/*
 * @Author: 聂芳 nie4161204@qq.com
 * @Date: 2023-02-20 17:02:31
 * @LastEditors: 聂芳 nie4161204@qq.com
 * @LastEditTime: 2023-03-29 11:33:53
 * @FilePath: /vue3-frog-admin/src/service/constants/qimengs.js
 * @Description: 启蒙
 *
 */
import { post, get, del, put } from '../request'
/**
 * @description: 新增成语
 * @param {*} params
 * @return {*}
 */
export const createQimeng = (params) => {
  return post('/api/admin/qimengs', params)
}
/**
 * @description: 查询成语列表
 * @param {*} params
 * @return {*}
 */
export const getQimengList = (params) => {
  return post('/api/admin/qimengs/page', params)
}
/**
 * @description: 根据id查询成语
 * @param {*} params
 * @return {*}
 */
export const getQimengById = (id) => {
  return get(`/api/admin/qimengs/${id}`)
}
/**
 * @description: 根据id删除成语
 * @param {*} params
 * @return {*}
 */
export const delteQimengById = (id) => {
  return del(`/api/admin/qimengs/${id}`)
}
/**
 * @description: 根据id更新成语
 * @param {*} params
 * @return {*}
 */
export const updateQimengById = (id, params) => {
  return put(`/api/admin/qimengs/${id}`, params)
}
