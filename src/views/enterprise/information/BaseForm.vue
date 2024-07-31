<!-- information -->
<template>
  <a-form
    :disabled="disabled"
    :model="formState"
    :rules="formRules"
    v-bind="formItemLayout"
    layout="horizonmax"
    ref="formRef"
    label-width="160px"
  >
    <a-form-item label="代理商名称" name="companyName">
      <a-input v-model:value="formState.companyName" placeholder="请输入代理商名称" />
    </a-form-item>
    <a-form-item label="联系人" name="contactName">
      <a-input v-model:value="formState.contactName" placeholder="请输入联系人" />
    </a-form-item>
    <a-form-item label="联系电话" name="contactMobile">
      <a-input v-model:value="formState.contactMobile" placeholder="请输入联系电话" />
    </a-form-item>
  </a-form>
</template>

<script setup>
import { ref, shallowRef } from 'vue'
defineOptions({
  name: 'InformationBaseForm'
})
const props = defineProps({
  info: {
    type: Object,
    default: () => {}
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 7
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 17
    }
  }
}
const formRef = shallowRef()
const formState = ref(props.info)
const formRules = ref({
  companyName: [
    {
      required: true,
      message: '请输入代理商名称'
    }
  ],
  contactName: [
    {
      required: true,
      message: '请输入联系人'
    }
  ],
  contactMobile: [
    {
      required: true,
      message: '请输入联系电话'
    }
  ]
})
console.log('base', props.info)
</script>
<style scoped></style>
