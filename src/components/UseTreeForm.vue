<!--  -->
<template>
  <a-input-search
    v-model:value="searchValue"
    style="margin-bottom: 8px"
    :placeholder="placeholder"
  />
  <a-tree
    v-model:checkedKeys="checkedKeys"
    :auto-expand-parent="autoExpandParent"
    checkable
    :expanded-keys="expandedKeys"
    :height="height"
    :tree-data="treeData"
    :field-names="fieldNames"
    @expand="onExpand"
    @check="onCheck"
  >
    <template #title="{ title }">
      <span v-if="title.indexOf(searchValue) > -1">
        {{ title.substring(0, title.indexOf(searchValue)) }}
        <span style="color: #f50">{{ searchValue }}</span>
        {{ title.substring(title.indexOf(searchValue) + searchValue.length) }}
      </span>
      <span v-else>{{ title }}</span>
    </template>
  </a-tree>
</template>

<script setup>
import { useDebounceFn, watchDebounced } from '@vueuse/core'
import { ref, unref } from 'vue'
defineOptions({ name: 'UseTreeForm' })
const props = defineProps({
  treeData: {
    type: Object,
    default: () => {
      return []
    }
  },
  value: {
    type: Object,
    default: () => {
      return []
    }
  },
  placeholder: {
    type: String,
    default: '请输入菜单名称'
  },
  height: {
    type: Number,
    default: 600
  },
  fieldNames: {
    type: Object,
    default: () => {
      return {
        children: 'children',
        title: 'title',
        key: 'key'
      }
    }
  }
})
const emits = defineEmits(['update:value', 'change'])
const checkedKeys = ref(props.value)
watchDebounced(
  () => props.value,
  (val) => {
    checkedKeys.value = val
  },
  { debounce: 300, maxWait: 1000 }
)
const searchValue = ref('')
const expandedKeys = ref([])
const autoExpandParent = ref(true)
const onExpand = (keys) => {
  expandedKeys.value = keys
  autoExpandParent.value = false
}
/**
 * @description: 格式化获取菜单数据
 */
const dataList = []
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i]
    const key = node[props.fieldNames.key]
    const title = node[props.fieldNames.title]
    const children = node[props.fieldNames.children]
    dataList.push({
      key,
      title
    })
    if (children) {
      generateList(children)
    }
  }
}
generateList(props.treeData)
const getParentKey = (key, tree) => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    const children = node[props.fieldNames.children]
    if (children) {
      if (children.some((item) => item[props.fieldNames.key] === key)) {
        parentKey = node[props.fieldNames.key]
      } else if (getParentKey(key, children)) {
        parentKey = getParentKey(key, children)
      }
    }
  }
  return parentKey
}
const getExpandedKeys = (value) => {
  const expanded = dataList
    .map((item) => {
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.key, props.treeData)
      }
      return null
    })
    .filter((item, i, self) => item && self.indexOf(item) === i)
  expandedKeys.value = expanded
  searchValue.value = value
  autoExpandParent.value = true
}
watchDebounced(searchValue, (value) => getExpandedKeys(value), { debounce: 300, maxWait: 1000 })
const onCheck = useDebounceFn((checkedKeys) => {
  emits('update:value', checkedKeys)
  emits('change', checkedKeys)
}, 300)
/**
 * @description 初始化 expandedKeys 结果
 */
getExpandedKeys('')
const getResult = () => {
  return unref(checkedKeys.value)
}
defineExpose({
  getResult
})
</script>
<style scoped></style>
