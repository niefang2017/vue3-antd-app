<!-- EditMenu -->
<template>
  <a-drawer :open="show" :title="title" placement="right" :width="700" @close="close">
    <a-form
      :model="formState"
      :rules="formRules"
      layout="horizontal"
      ref="formRef"
      v-bind="formItemLayout"
    >
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="菜单类型" name="menuType">
            <a-radio-group v-model:value="formState.menuType" button-style="solid">
              <a-radio-button v-for="item in menuTypeOptions" :key="item.value" :value="item.value">
                {{ item.label }}
              </a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="菜单名称" name="title">
            <a-input
              :maxlength="100"
              v-model:value="formState.title"
              placeholder="请输入菜单名称"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="上级菜单" name="parentId">
            <a-tree-select
              v-model:value="formState.parentId"
              show-search
              w-full
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="请选择上级菜单"
              allow-clear
              tree-default-expand-all
              :tree-data="menuList"
              tree-node-filter-prop="title"
              :field-names="{
                children: 'children',
                label: 'title',
                value: 'key'
              }"
            >
              <template #title="{ title }">
                {{ title }}
              </template>
            </a-tree-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="排序" name="sort">
            <a-input-number
              style="width: 100%"
              :defaultValue="formState.sort"
              v-model:value="formState.sort"
              :min="0"
              :max="10000"
              placeholder="请输入菜单排序"
            ></a-input-number>
          </a-form-item>
        </a-col>
        <a-col v-if="formState.menuType !== 3" :span="12">
          <a-form-item label="图标" name="icon">
            <IconPicker
              v-model:value="formState.icon"
              @change="validateFields(['icon'])"
            ></IconPicker>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="菜单地址" name="path">
            <a-input
              v-model:value="formState.path"
              :maxlength="1000"
              placeholder="请输入菜单地址"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col v-if="formState.menuType !== 1" :span="12">
          <a-form-item label="权限标志" name="code">
            <a-input
              v-model:value="formState.code"
              :maxlength="100"
              placeholder="请输入权限标志"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="是否启用" name="status">
            <a-radio-group v-model:value="formState.status" button-style="solid">
              <a-radio-button
                v-for="item in menuStatusOptions"
                :key="item.value"
                :value="item.value"
                >{{ item.label }}</a-radio-button
              >
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
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
import IconPicker from 'components/Icon/IconPicker'
import { menuStatusList, menuTypeList } from 'constants/index'
import { deepClone } from 'utils/tool'
import { computed, ref, toRaw, watch } from 'vue'
const [messageApi, contextHolder] = message.useMessage()
defineOptions({ name: 'EditMenu' })
defineProps({
  menuList: {
    type: Array,
    default: () => []
  }
})
const emits = defineEmits(['change'])
const menuStatusOptions = ref(menuStatusList)
const menuTypeOptions = ref(menuTypeList)
const formRef = ref()
const show = ref(false)
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 6
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 18
    }
  }
}
const defaultForm = {
  title: '', // 菜单名称
  menuType: 1,
  parentId: null, // 上级id
  sort: 1, //排序
  path: '', // 菜单地址
  code: '', // 权限标志
  status: 1, // 是否启用
  icon: ''
}
const formState = ref(deepClone(defaultForm))
// 规则
const formRules = ref({
  title: [
    {
      required: true,
      message: '请输入菜单名称'
    }
  ],
  sort: [
    {
      required: true,
      message: '请输入排序'
    }
  ],
  icon: [
    {
      required: true,
      message: '请选择菜单图标'
    }
  ],
  path: [
    {
      required: true,
      message: '请输入菜单地址'
    }
  ]
})
watch(
  () => formState.value.menuType,
  (n) => {
    formRules.value['icon'][0].required = n === 1
  },
  { deep: true }
)
const actionType = ref(0)
/**
 *
 * @param {Number} type 0:新增,1:关联api,2:禁用,3:添加下级菜单,4:编辑
 */
const title = computed(() => {
  return actionType.value === 0 ? '新增菜单' : '编辑菜单'
})

/**
 * @description 处理选择icon
 */
const validateFields = (fields = []) => {
  if (!fields?.length) return
  formRef.value.validateFields(fields)
}
/**
 * @description 提交
 */
const loading = ref(false)
const onSubmit = useDebounceFn(
  () => {
    loading.value = true
    formRef.value
      .validate()
      .then(() => {
        const params = deepClone(toRaw(formState.value))
        console.log('保存数据', params)
        messageApi.success('保存成功')
        loading.value = false
        emits('change', params)
      })
      .catch((error) => {
        console.log('error', error)
        loading.value = false
      })
  },
  500,
  {
    leading: true,
    trailing: false
  }
)
const open = (type = 0, params = {}) => {
  show.value = true
  actionType.value = type
  if (type === 0) {
    formState.value = deepClone(defaultForm)
    console.log('formState.value', formState.value)
    return
  }
  formState.value = {
    title: params?.title ?? '', // 菜单名称
    menuType: params?.menuType ?? 1,
    parentId: params?.parentId ?? '', // 上级id
    sort: params?.sort ?? 1, //排序
    path: params?.path ?? '', // 菜单地址
    code: params?.code ?? '', // 权限标志
    status: Number(params?.status ?? 0) // 是否启用
  }
  console.log('formState.value', formState.value)
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
