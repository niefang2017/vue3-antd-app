<!-- EditMenu -->
<template>
  <a-drawer :open="show" :title="title" placement="right" :width="700" @close="close">
    <a-form
      :model="formState"
      :rules="formRules"
      layout="horizontal"
      ref="formRef"
      v-bind="formItemLayout"
      autocomplete="off"
    >
      <a-form-item label="部门名称" name="name">
        <a-input
          :maxlength="30"
          v-model:value="formState.name"
          placeholder="请输入部门名称"
        ></a-input>
      </a-form-item>
      <a-form-item v-if="!formState.isRoot" label="上级部门" name="parentId">
        <a-tree-select
          v-model:value="formState.parentId"
          show-search
          w-full
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择上级部门"
          allow-clear
          tree-default-expand-all
          :tree-data="treeList"
          tree-node-filter-prop="name"
          :field-names="{
            children: 'children',
            label: 'name',
            value: 'key'
          }"
        >
          <template #title="{ name }">
            {{ name }}
          </template>
        </a-tree-select>
      </a-form-item>
    </a-form>
    <template #extra>
      <a-space>
        <a-button @click="close">取消</a-button>
        <a-button type="primary" @click="onSubmit" :loading="loading">提交</a-button>
      </a-space>
    </template>
  </a-drawer>
  <context-holder />
</template>

<script setup>
import { useDebounceFn } from '@vueuse/core'
import { message } from 'ant-design-vue'
import { deepClone, guid } from 'utils/tool'
import { computed, ref, shallowRef, toRaw } from 'vue'
const [messageApi, contextHolder] = message.useMessage()
defineOptions({ name: 'DepartmentEdit' })
defineProps({
  treeList: {
    type: Array,
    default: () => []
  }
})
const emits = defineEmits(['change'])
const formRef = shallowRef()
const show = ref(false)
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 4
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 20
    }
  }
}
const defaultForm = {
  name: '', // 部门名称
  parentId: '', // 上级部门
  key: '', // 请选择所属部门id,
  num: 0,
  isRoot: false
}
const formState = ref(deepClone(defaultForm))
// 规则
const formRules = ref({
  name: [
    {
      required: true,
      message: '请输入部门名称'
    }
  ],
  parentId: [
    {
      required: false,
      message: '请选择上级部门'
    }
  ]
  // department: [
  //   {
  //     required: true,
  //     message: '请选择所属部门',
  //     type: 'array'
  //   }
  // ]
})
const actionType = ref(0)
/**
 *
 * @param {Number} type 0:新增,1:编辑:3:添加下级菜单
 */
const title = computed(() => {
  const tmp = {
    0: '新增部门',
    1: '编辑部门',
    2: '新增子部门'
  }
  return tmp[actionType.value]
})
/**
 * @description 提交
 */
const loading = ref(false)
const onSubmit = useDebounceFn(() => {
  loading.value = true
  formRef.value
    .validate()
    .then(() => {
      let params = deepClone(toRaw(formState.value))
      loading.value = false
      messageApi.success('保存成功')
      emits('change', actionType.value, {
        key: params?.key || guid(8),
        name: params.name,
        num: params?.num ?? 0,
        parentId: params?.parentId || ''
      })

      console.log('保存', actionType.value, formState.value)
      close()
    })
    .catch((error) => {
      console.log('error', error)
      loading.value = false
    })
}, 100)
/**
 * @description 查详情
 * @param {Number} type 0:新增,1:编辑:3:添加下级菜单
 */
const init = ({ key = '', name = '', parentId = null, num = 0, isRoot = false }) => {
  formState.value = {
    key,
    name,
    parentId,
    num,
    isRoot
  }
  console.log('formState.value', formState.value)
}
const open = (type = 0, params = {}) => {
  actionType.value = type
  console.log('打开', actionType.value, formState.value, params)
  const tmp = {
    0: () => {
      formState.value = { ...deepClone(defaultForm), isRoot: true }
    },
    1: () => init(params),
    2: () => init(params)
  }
  formRules.value['parentId'][0].required = !params.isRoot
  tmp[type]()
  console.log('打开', formState.value)
  show.value = true
}
const close = () => {
  formState.value = deepClone(defaultForm)
  formRef.value.resetFields()
  formRef.value.clearValidate()
  loading.value = false
  show.value = false
}
defineExpose({
  open,
  close
})
</script>
<style scoped></style>
