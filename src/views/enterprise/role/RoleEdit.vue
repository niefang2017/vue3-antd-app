<!-- EditMenu -->
<template>
  <a-drawer :open="show" :title="title" placement="right" :width="700" @close="close">
    <a-form
      :model="formState"
      :rules="formRules"
      layout="horizontal"
      ref="formRef"
      autocomplete="off"
      v-bind="formItemLayout"
    >
      <a-form-item label="菜单名称" name="roleName">
        <a-input
          :maxlength="100"
          v-model:value="formState.roleName"
          placeholder="请输入菜单名称"
        ></a-input>
      </a-form-item>
      <a-form-item label="角色描述" name="roleDesc">
        <a-textarea
          v-model:value="formState.roleDesc"
          :rows="6"
          placeholder="请输入角色描述"
          :maxlength="500"
          showCount
        />
      </a-form-item>

      <a-form-item label="角色权限" name="authList">
        <use-tree-form
          ref="menuRef"
          :treeData="menuList"
          v-model:value="formState.authList"
          placeholder="请输入权限"
          :height="500"
          @change="validateFields(['authList'])"
        ></use-tree-form>
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
import UseTreeForm from 'components/UseTreeForm'
import { deepClone } from 'utils/tool'
import { computed, ref, shallowRef, toRaw } from 'vue'
const [messageApi, contextHolder] = message.useMessage()
defineOptions({ name: 'RoleEdit' })
defineProps({
  menuList: {
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
      span: 3
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 21
    }
  }
}
const defaultForm = {
  roleName: '', // 角色名称
  roleDesc: '', // 角色描述
  authList: [] // 权限列表
}
const formState = ref(deepClone(defaultForm))
// 规则
const formRules = ref({
  roleName: [
    {
      required: true,
      message: '请输入角色名称'
    }
  ],
  roleDesc: [
    {
      required: true,
      message: '请输入角色描述'
    }
  ],
  authList: [
    {
      type: 'array',
      required: true,
      message: '请选择权限',
      trigger: 'change'
    }
  ]
})
/**
 * @description 校验字段
 */
const validateFields = (fields = []) => {
  if (!fields?.length) return
  formRef.value.validateFields(fields)
}
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
const init = (params = {}) => {
  formState.value = {
    roleName: params.name,
    roleDesc: params.desc,
    id: params.id,
    authList: params?.authList ?? []
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
