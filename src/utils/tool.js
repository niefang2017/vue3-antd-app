/**
 * @description 设置页面标题
 */
export const setTitle = (title) => {
  document.title = title ? '春秋阁管理后台_' + title : '春秋阁'
}

/**
 * @method random
 * @description 随机生成数值，返回 min（包含）～ max（包含）之间的数字
 * @property {Number} min 最小值
 * @property {Number} max 最大值
 */
export const random = (min = 0, max = 10) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
/**
 * @description: 校验中文名称
 * @param {String} val 名称
 * @return {Boolean}
 */
export const validateChinese = (val) => {
  const reg = /^[\u4e00-\u9fa5｜\uff0c]+$/gi
  return reg.test(val)
}

/**
 * @method deepClone
 * @description 深拷贝
 */
export const deepClone = (obj) => {
  if (obj == null || typeof obj !== 'object') return obj
  let res = obj instanceof Array ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[key] = deepClone(obj[key])
    }
  }
  return res
}
/**
 * @description 生成guid
 */
export const guid = (length=32) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
