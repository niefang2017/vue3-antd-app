/**
 * @description: 格式化菜单数据
 * @param {Array} data
 * @return {Array}
 */
export const formatMenuTreeData = (data = [], isFull = false) => {
  function traverseAndReplace(item = {}) {
    if (typeof item === 'object' && item !== null) {
      const title = typeof item?.meta?.title === 'function' ? item.meta.title() : item.meta.title
      const key = item?.key ?? item?.meta?.key ?? item?.name
      const tmp = {
        key: key,
        title: title || '暂无名称',
        disabled: item?.disabled ?? false,
        disableCheckbox: item?.disabled ?? item?.disableCheckbox ?? false
      }
      if (isFull) {
        tmp.icon = item.meta?.icon ?? ''
        tmp.path = item.path ?? ''
        tmp.menuType = item?.menuType ?? null
        tmp.status = item?.status ?? null
      }
      if (Array.isArray(item.children)) {
        tmp.children = item.children.map(traverseAndReplace)
      }
      return tmp
    }
  }
  return data.map(traverseAndReplace)
}

/**
 * @description 处理Tree数据字段更改
 */
export const changeTreeData = (
  data = [],
  key = 'id',
  value = '',
  changekey = 'status',
  changeValue = ''
) => {
  function traverseAndReplace(item) {
    if (typeof item === 'object' && item !== null) {
      const tmp = {
        ...item
      }
      if (tmp[key] === value) {
        tmp[changekey] = changeValue
      }
      if (tmp[key] !== value && Array.isArray(item.children)) {
        tmp.children = item.children.map(traverseAndReplace)
      }
      return tmp
    }
  }
  return data.map(traverseAndReplace)
}
