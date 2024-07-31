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
      <a-form-item label="员工名称" name="name">
        <a-input
          :maxlength="30"
          v-model:value="formState.name"
          placeholder="请输入员工名称"
        ></a-input>
      </a-form-item>
      <a-form-item label="员工手机号" name="mobile">
        <a-input
          :maxlength="11"
          v-model:value="formState.mobile"
          placeholder="员工手机号"
        ></a-input>
      </a-form-item>
      <a-form-item label="所属部门" name="department">
        <a-tree-select
          v-model:value="formState.department"
          show-search
          w-full
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择所属部门"
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

      <a-form-item label="角色" name="roleList">
        <a-checkbox-group
          v-model:value="formState.roleList"
          name="checkboxgroup"
          :options="roleOptions"
        ></a-checkbox-group>
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
import { roleTypeList } from 'constants/index'
import { deepClone } from 'utils/tool'
import { computed, ref, shallowRef, toRaw } from 'vue'
const [messageApi, contextHolder] = message.useMessage()
defineOptions({ name: 'EmployeeEdit' })
defineProps({
  treeList: {
    type: Array,
    default: () => []
  }
})
const roleOptions = ref(roleTypeList)
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
  name: '', // 员工名称
  mobile: '', // 员工手机号
  department: '', // 请选择所属部门
  roleList: [] // 角色列表
}
const formState = ref(deepClone(defaultForm))
const validateMobile = (_, value) => {
  const reg = /^1[3456789]\d{9}$/
  return reg.test(value) ? Promise.resolve() : Promise.reject('手机号格式不正确')
}
// 规则
const formRules = ref({
  name: [
    {
      required: true,
      message: '请输入员工名称'
    }
  ],
  mobile: [
    {
      required: true,
      message: '请输入员工手机号',
      trigger: 'blur',
      validator: validateMobile
    }
  ],
  department: [
    {
      required: true,
      message: '请选择所属部门'
    }
  ],
  roleList: [
    {
      type: 'array',
      required: true,
      message: '请选择角色',
      trigger: 'change'
    }
  ]
})
const actionType = ref(0)
/**
 *
 * @param {Number} type 0:新增,1:关联api,2:禁用,3:添加下级菜单,4:编辑
 */
const title = computed(() => {
  return actionType.value === 0 ? '新增角色' : '编辑角色'
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
      const params = deepClone(toRaw(formState.value))
      console.log('保存数据', params)
      messageApi.success('保存成功')
      loading.value = false
      close()
      emits('change', params)
    })
    .catch((error) => {
      console.log('error', error)
      loading.value = false
    })
}, 100)
/**
 * @description 查详情
 */
const init = ({ id = '', name = '', mobile = '', department = '', roleList = [] }) => {
  formState.value = {
    id,
    name,
    mobile,
    department,
    roleList
  }
}
const open = (type = 0, params = {}) => {
  actionType.value = type
  const tmp = {
    0: () => {
      formState.value = deepClone(defaultForm)
    },
    1: () => init(params)
  }
  tmp[type]()
  show.value = true
}
const close = () => {
  formState.value = deepClone(defaultForm)
  formRef.value.resetFields()
  loading.value = false
  show.value = false
}
defineExpose({
  open,
  close
})
</script>
<style scoped></style>
