import { post } from '../request'
/**
 * @description 获取省份
 */
export const getAllParentId = (params = {}) => {
  return post('/system/company-save-gold/getAllParentId', params)
}
/**
 * @description 获取下级城市区域
 */
export const getCityByParentId = (parentId = '', params = {}) => {
  const url = `/system/company-save-gold/getCityByParentId?parentId=${parentId}`
  return post(url, params)
}
