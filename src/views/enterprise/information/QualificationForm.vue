<!-- information -->
<template>
  <a-form
    :disabled="disabled"
    :model="formState"
    :rules="formRules"
    v-bind="formItemLayout"
    layout="horizontal"
    ref="formRef"
  >
    <a-form-item label="营业执照" name="businessLicenseUrl">
      <use-upload
        v-model:value="businessLicenseUrlList"
        @change="(val) => handleChangeImg(val, ['businessLicenseUrl'])"
      >
      </use-upload>
    </a-form-item>
    <a-form-item label="企业名称" name="companyName">
      <a-input v-model:value="formState.companyName" placeholder="请输入企业名称" />
    </a-form-item>

    <a-form-item label="统一社会信用代码" name="socialCreditIdentifier">
      <a-input
        v-model:value="formState.socialCreditIdentifier"
        placeholder="请输入统一社会信用代码"
      />
    </a-form-item>
    <a-form-item label="企业类型" name="companyType">
      <a-select
        v-model:value="formState.companyType"
        :options="companyTypeOptions"
        placeholder="请选择企业类型"
      ></a-select>
    </a-form-item>
    <a-form-item label="经营地址" name="operateList">
      <use-city-cascader
        v-model:value="formState.operateList"
        @change="validateFields(['operateList'])"
      ></use-city-cascader>
    </a-form-item>
    <a-form-item label="详细地址" name="operateAddr">
      <a-textarea
        v-model:value="formState.operateAddr"
        :rows="3"
        :maxlength="50"
        show-count
        placeholder="请输入详细地址"
      />
    </a-form-item>
    <a-form-item label="身份证图片" name="certificateUrlList">
      <use-upload
        multiple
        :max-count="2"
        v-model:value="certificateUrlList"
        @change="(val) => handleChangeImg(val, ['certificateUrlList'])"
      ></use-upload>
    </a-form-item>
    <a-form-item label="身份证号码" name="certificateNumber">
      <a-input v-model:value="formState.certificateNumber" placeholder="请输入身份证号码" />
    </a-form-item>
    <a-form-item label="法人姓名" name="legalPersonName">
      <a-input v-model:value="formState.legalPersonName" placeholder="请输入法人姓名" />
    </a-form-item>
    <a-form-item label="身份证有效期" name="certificateValidTimeList">
      <a-range-picker
        v-model:value="certificateValidTimeList"
        :format="dateFormat"
        :disabled-date="disabledDate"
        :placeholder="['开始日期', '结束日期']"
      />
    </a-form-item>
  </a-form>
</template>

<script setup>
import UseCityCascader from 'components/UseCityCascader'
import UseUpload from 'components/UseUpload'
// import { message } from 'ant-design-vue'
import { companyTypeList } from 'constants/index'
import dayjs from 'dayjs'
import { ref, shallowRef } from 'vue'
defineOptions({
  name: 'InformationQualificationForm'
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
// 身份证有效期
const certificateValidTimeList = ref([])
/**
 * @description 校验字段
 */
const validateFields = (fields = []) => {
  if (!fields?.length) return
  formRef.value.validateFields(fields)
}
const companyTypeOptions = ref(companyTypeList)
const formRef = shallowRef()
const formState = ref(props.info)
const formRules = ref({
  businessLicenseUrl: [
    {
      required: true,
      message: '请上传营业执照',
      validator: (rule) => {
        if (!businessLicenseUrlList?.value?.length) {
          return Promise.reject(rule.message)
        }
        return Promise.resolve()
      }
    }
  ],
  companyName: [
    {
      required: true,
      message: '请输入企业名称'
    }
  ],
  socialCreditIdentifier: [
    {
      required: true,
      message: '请输入统一社会信用代码'
    }
  ],
  companyType: [
    {
      required: true,
      message: '请选择企业类型'
    }
  ],
  operateList: [
    {
      required: true,
      message: '请选择经营地址',
      trigger: 'change',
      type: 'array'
    }
  ],
  operateAddr: [
    {
      required: true,
      message: '请输入详细地址'
    }
  ],
  certificateUrlList: [
    {
      required: true,
      message: '请上传身份证照片',
      type: 'array',
      validator: (rule) => {
        if (!certificateUrlList?.value?.length) {
          return Promise.reject(rule.message)
        }
        return Promise.resolve()
      }
    }
  ],
  certificateNumber: [
    {
      required: true,
      message: '身份证号码'
    }
  ],
  legalPersonName: [
    {
      required: true,
      message: '请输入法人姓名'
    }
  ],
  certificateValidTimeList: [
    {
      required: true,
      message: '请选择身份证有效期',
      trigger: 'change',
      validator: (rule) => {
        if (
          !certificateValidTimeList?.value?.length &&
          formState.value.isCertificateValidPerpetual === 10
        ) {
          return Promise.reject(rule.message)
        }
        return Promise.resolve()
      }
    }
  ]
})
/**
 * @description 初始化经营地址
 */
const initArea = async () => {
  const arr = [
    props.info?.provinceId || '',
    props.info?.cityId || '',
    props.info?.areaId || '',
    props.info?.streetId || ''
  ].filter((item) => item)
  formState.value.operateList = arr
}
initArea()

// const onChangeOperateList = (value = []) => {
//   validateFields(['operateList'])
//   const [provinceId = '', cityId = '', areaId = '', streetId = ''] = value || []
//   formState.value.provinceId = provinceId
//   formState.value.cityId = cityId
//   formState.value.areaId = areaId
//   formState.value.streetId = streetId
// }
const businessLicenseUrlList = ref([])
const certificateUrlList = ref([])
const initImgs = () => {
  // 营业执照
  businessLicenseUrlList.value = [{ url: props.info.businessLicenseUrl }]
  certificateUrlList.value = [
    { url: props.info.certificateFrontUrl },
    { url: props.info.certificateReverseUrl }
  ]
}
initImgs()
// 初始化日期
const dateFormat = 'YYYY-MM-DD'
const disabledDate = (current) => {
  return current && current > dayjs().endOf('day')
}
const initData = () => {
  certificateValidTimeList.value = [
    dayjs(props.info.certificateValidTimeStart.replace(/\./g, '/'), dateFormat),
    dayjs(props.info.certificateValidTimeEnd.replace(/\./g, '/'), dateFormat)
  ]
  console.log('riqi', props.info.certificateValidTimeEnd.replace(/\./g, '/'))
}
initData()
/**
 * @description 处理图片上传
 */
const handleChangeImg = (val, keys) => {
  console.log('处理图片上传校验val', val)
  const ulrs = val.map((item) => {
    return { url: item.url }
  })
  console.log('处理后图片数据', ulrs)
  validateFields(keys)
}
</script>
<style scoped></style>
