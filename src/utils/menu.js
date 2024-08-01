/**
 * @description: 格式化菜单数据
 * @param {Array} data
 * @return {Array}
 */
export const formatMenuTreeData = (data = [], isFull = false) => {
  function traverseAndReplace(item = {}, parentId = '') {
    if (typeof item === 'object' && item !== null) {
      const title = typeof item?.meta?.title === 'function' ? item.meta.title() : item.meta.title
      const key = item?.key ?? item?.meta?.key ?? item?.name
      const tmp = {
        key: key,
        title: title || '暂无名称',
        disabled: item?.disabled ?? false,
        disableCheckbox: item?.disabled ?? item?.disableCheckbox ?? false,
        parentId
      }
      if (isFull) {
        tmp.icon = item.meta?.icon ?? ''
        tmp.path = item.path ?? ''
        tmp.menuType = item?.menuType ?? null
        tmp.status = item?.status ?? null
      }
      if (Array.isArray(item.children)) {
        tmp.children = item.children.map((c) => traverseAndReplace(c, tmp.key))
      }
      return tmp
    }
  }
  return data.map((item) => traverseAndReplace(item, ''))
}

/**
 * @description 处理Tree数据字段更改
 */
export const changeTreeData = (data = [], key = 'id', value = '', row = {}, isAdd = false) => {
  function traverseAndReplace(item) {
    if (typeof item === 'object' && item !== null) {
      let tmp = {
        ...item
      }
      if (tmp[key] === value) {
        if (isAdd) {
          tmp.children = tmp?.children ?? []
          tmp.children.push(row)
        } else {
          tmp = {
            ...item,
            ...row
          }
        }
      }
      if (tmp[key] !== value && Array.isArray(item.children)) {
        tmp.children = item.children.map(traverseAndReplace)
      }
      return tmp
    }
  }

  return data.map(traverseAndReplace)
}

/**
 * @description: 格式化菜单数据
 * @param {Array} data
 * @return {Array}
 */
export const formatTreeData = (data = []) => {
  function traverseAndReplace(item = {}, parentId = '') {
    if (typeof item === 'object' && item !== null) {
      const tmp = {
        ...item,
        parentId
      }
      if (Array.isArray(item.children)) {
        tmp.children = item.children.map((c) => traverseAndReplace(c, tmp.key))
      }
      return tmp
    }
  }
  return data.map((item) => traverseAndReplace(item, ''))
}

/**
 * description: 拍平tree
 */
export const flatTree = (tree) => {
  const result = []
  function traverse(node, parentKey) {
    const key = node?.key ?? node?.meta?.key ?? node?.name
    const tmp = { name: node.name, path: node.path, ...node.meta, key }
    const newNode = Object.assign({}, tmp, { parentKey }, { children: undefined })
    delete newNode.children
    result.push(newNode)
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach((child) => traverse(child, node.key))
    }
  }
  tree.forEach((node) => traverse(node, null))

  return result
}
