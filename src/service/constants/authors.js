/*
 * @Author: 聂芳 nie4161204@qq.com
 * @Date: 2023-02-20 17:02:31
 * @LastEditors: 聂芳 nie4161204@qq.com
 * @LastEditTime: 2024-05-02 12:34:03
 * @FilePath: /vue3-frog-admin/src/service/constants/authors.js
 * @Description: 启蒙
 *
 */
import { del, get, post, put } from '../request'
/**
 * @description: 新增作者
 * @param {*} params
 * @return {*}
 */
export const createAuthor = (params) => {
  return post('/api/admin/authors', params)
}
/**
 * @description: 查询作者列表
 * @param {*} params
 * @return {*}
 */
export const getAuthorList = (params) => {
  return post('/api/admin/authors/page', params)
}
/**
 * @description: 根据id查询作者
 * @param {*} params
 * @return {*}
 */
export const getAuthorById = (id) => {
  return get(`/api/admin/authors/${id}`)
}
/**
 * @description: 根据id删除作者
 * @param {*} params
 * @return {*}
 */
export const delteAuthorById = (id) => {
  return del(`/api/admin/authors/${id}`)
}
/**
 * @description: 根据id更新作者
 * @param {*} params
 * @return {*}
 */
export const updateAuthorById = (id, params) => {
  return put(`/api/admin/authors/${id}`, params)
}
