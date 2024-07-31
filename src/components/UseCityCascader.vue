<!--  -->
<template>
  <a-cascader
    v-model:value="checkedKeys"
    :options="operateOptions"
    :load-data="loadData"
    :field-names="fieldNames"
    :multiple="multiple"
    :allow-clear="allowClear"
    :change-on-select="changeOnSelect"
    :show-checked-strategy="showCheckedStrategy"
    :max-tag-count="maxTagCount"
    placeholder="请选择经营地址"
    @change="onCheck"
  />
</template>

<script setup>
/**
 * @description: 业务组件获取省市区数据
 */
import { useDebounceFn, watchDebounced } from '@vueuse/core'
import { getAllParentId, getCityByParentId } from 'service/api'
import { ref, unref } from 'vue'
defineOptions({ name: 'UseCityCascader' })
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
      return [] // 默认值 [省, 市, 区,街道] 如:["北京市","北京市","东城区","东直门街道"]
    }
  },
  placeholder: {
    type: String,
    default: '请选择经营地址'
  },
  fieldNames: {
    type: Object,
    default: () => {
      return {
        children: 'children',
        title: 'label',
        key: 'value'
      }
    }
  },
  multiple: {
    type: Boolean,
    default: false
  },
  changeOnSelect: {
    type: Boolean,
    default: false
  },
  showCheckedStrategy: {
    type: String,
    default: 'SHOW_PARENT' // SHOW_CHILD
  },
  maxTagCount: {
    type: Number,
    default: 10
  },
  allowClear: {
    type: Boolean,
    default: true
  }
})
const emits = defineEmits(['update:value', 'change'])
const checkedKeys = ref(props.value)
watchDebounced(
  () => props.value,
  (val) => {
    checkedKeys.value = val.filter((item) => item)
  },
  { debounce: 300, maxWait: 1000 }
)

const operateOptions = ref([])
const formatOptions = (list = [], isLeaf = false) => {
  return (
    list?.map((item) => {
      return {
        value: item.areaId,
        label: item.name,
        parentAreaId: item.parentAreaId,
        isLeaf,
        children: []
      }
    }) ?? []
  )
}
/**
 * @description 初始化城市区域
 */
async function loadChildren(allData, val, data) {
  return new Promise((resolve) => {
    function traverse(item) {
      if (typeof item === 'object' && item !== null) {
        let tmp = { ...item }
        if (tmp.value === val) {
          tmp.children = data
        }
        if (tmp.value !== val && Array.isArray(item.children)) {
          tmp.children = item.children.map(traverse)
        }
        return tmp
      }
    }
    resolve(allData.map(traverse))
  })
}
/**
 * @description: 格式化获取区域数据
 */
const initArea = async () => {
  const arr = props.value.filter((item) => item)
  const res = await getAllParentId()
  operateOptions.value = Array.isArray(res?.data) ? formatOptions(res?.data || []) : []
  // 异步遍历查询区域
  const other = arr.slice(0, arr.length - 1)
  for (let i = 0; i < other.length; i++) {
    const item = other[i]
    const isLeaf = i + 1 === other.length
    const areaRes = await getCityByParentId(item)
    operateOptions.value = await loadChildren(
      operateOptions.value,
      item,
      formatOptions(areaRes?.data || [], isLeaf)
    )
  }
}
initArea()
// 加载数据
const loadData = async (selectedOptions) => {
  const targetOption = selectedOptions[selectedOptions.length - 1]
  targetOption.loading = true
  const res = await getCityByParentId(targetOption.value)
  targetOption.loading = false
  targetOption.children = Array.isArray(res?.data)
    ? formatOptions(res?.data || [], selectedOptions.length >= 3)
    : []
  operateOptions.value = [...operateOptions.value]
  return Promise.resolve()
}
const onCheck = useDebounceFn((checkedKeys) => {
  emits('update:value', checkedKeys)
  emits('change', checkedKeys)
}, 300)
const getResult = () => {
  return unref(checkedKeys.value)
}
defineExpose({
  getResult
})
</script>
<style scoped></style>
