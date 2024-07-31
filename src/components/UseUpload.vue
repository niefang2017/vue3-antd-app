<!-- UseUpload -->
<template>
  <a-upload
    v-model:file-list="fileList"
    :max-count="maxCount"
    :multiple="multiple"
    :list-type="listType"
    :before-upload="beforeUpload"
    @preview="handlePreview"
    @change="handleChange"
    @remove="handleRemove"
  >
    <div v-if="fileList.length < maxCount">
      <i
        v-if="loading"
        class="i-ant-design:loading-outlined text-3xl color-primary animate-spin"
      ></i>
      <i text-20 v-if="!loading" i-ant-design:plus-outlined></i>
      <div v-if="!loading">{{ text }}</div>
    </div>
  </a-upload>
  <!-- <Teleport to="body"> -->
  <div style="display: none">
    <a-image-preview-group
      :preview="{
        visible: previewVisible,
        onVisibleChange: (vis) => (previewVisible = vis),
        current: previewCurrent
      }"
    >
      <a-image v-for="(item, idx) in previewList" :key="idx" :src="item" />
    </a-image-preview-group>
  </div>
  <!-- </Teleport> -->
</template>

<script setup>
import { useDebounceFn, watchDebounced } from '@vueuse/core'
import { message } from 'ant-design-vue'
import { uploadImg } from 'service/api'
import { guid } from 'utils/tool'
import { ref } from 'vue'
defineOptions({
  name: 'UseUpload'
})
const props = defineProps({
  value: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  },
  action: {
    type: String,
    default: ''
  },
  headers: {
    type: Object,
    default: () => {}
  },
  text: {
    type: String,
    default: '上传'
  },
  data: {
    type: Object,
    default: () => {} // 请求参数
  },
  multiple: {
    type: Boolean,
    default: false
  },
  maxCount: {
    type: Number,
    default: 1
  },
  accept: {
    type: String,
    default: '.jpg,.png,.jpeg,.bmp,.webp,.gif'
  },
  listType: {
    type: String,
    default: 'picture-card'
  },
  size: {
    type: Number,
    default: 1 // MB
  }
})
const emits = defineEmits(['update:value', 'change'])
/**
 * @description 处理图片
 */
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
const formatFileList = (fileList) => {
  return fileList.map((file) => {
    const uid = guid(8)
    const name = file?.url?.split('/') ? file?.url?.split('/').pop() : file?.name || 'image.png'
    file = {
      ...file,
      uid: file.uid || uid,
      name: name,
      status: 'done',
      url: file.url,
      preview: file.url,
      response: {
        url: file.url
      }
    }
    return file
  })
}
const fileList = ref(formatFileList(props.value))

const loading = ref(false)
let errorIds = []
const handleChange = useDebounceFn(async (res) => {
  console.log('更改图片', res)
  let resFileList = [...res.fileList]
  let count = 0
  if (errorIds.length) {
    errorIds = errorIds.filter((el) => {
      const idx = fileList.value.findIndex((item) => item.uid === el)
      if (idx !== -1) {
        fileList.value.splice(idx, 1)
        return el !== res.file.uid
      }
    })
  } else {
    resFileList = resFileList.filter((item) => !errorIds.includes(item.uid)).slice(-props.maxCount)
    resFileList = resFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url
      }
      return file
    })
    const upList = resFileList.filter(
      (item) => !['done', 'removed'].includes(item.status) && !errorIds.includes(item.uid)
    )
    console.log('resFileList上传过滤', resFileList)
    console.log('resFileList上传过滤upList', upList)
    for await (const file of upList) {
      const result = await handleServiceData(file)
      resFileList[count] = {
        // ...file,
        ...result,
        response: {
          url: result.url
        }
      }
      // resFileList[count].url = result.url
      // resFileList[count].uid = file.uid
      // resFileList[count].status = 'done'
      // resFileList[count].response = {
      //   url: result.url
      // }
      count++
    }
  }
  console.log('resFileList', resFileList, fileList.value)
  fileList.value = resFileList
}, 1)
const handleRemove = (file) => {
  console.log('file', file)
  const index = fileList.value.findIndex((item) => item.uid === file.uid)
  const newFileList = fileList.value.slice()
  newFileList.splice(index, 1)
  fileList.value = newFileList
  console.log('newFileList', newFileList)
  emits('update:value', fileList.value)
  emits('change', fileList.value)
}
const handleUploadApi = (file) => {
  return new Promise((resolve) => {
    const formData = new FormData()
    formData.append('file', file)
    uploadImg(formData)
      .then((res) => {
        if (res.code == 1) {
          let map = {
            url: res.data,
            preview: res.data,
            uid: file.uid,
            name: file.name,
            status: 'done',
            thumbUrl: res.data,
            response: {
              url: res.data
            }
          }
          resolve({ status: 'success', data: map, msg: res.msg, code: res.code })
        } else {
          resolve({ status: 'error', msg: res.msg, code: res.code })
        }
      })
      .catch((error) => {
        resolve({ status: 'error', msg: error?.msg ?? '上传服务异常', code: error?.code ?? -1 })
      })
  })
}
const handleServiceData = async (file) => {
  const { status, msg, data, code = 0 } = await handleUploadApi(file)
  const idx = fileList.value.findIndex((item) => item.uid === file.uid)
  console.log('status', status, idx, file, data.url)
  if (data) {
    if (idx !== -1) {
      fileList.value.splice(idx, 1, {
        ...file,
        ...data,
        response: {
          url: data.url
        }
      })
    } else {
      fileList.value = [
        {
          ...data,
          response: {
            url: data.url
          }
        }
      ]
    }
    return Promise.resolve(data)
  }
  if (code !== 1 && idx !== -1) {
    fileList.value.splice(idx, 1)
    errorIds.push(file.uid)
    return Promise.reject(new Error(msg))
  }
}
const beforeUpload = async (file) => {
  const fileType = file.type.split('/')[1]
  const status = props.accept.includes(fileType)
  if (!status) {
    message.error('请选择jpg/png格式的图片!')
  }
  const isLt2M = file.size / 1024 / 1024 < props.size
  if (!isLt2M) {
    message.error('图片大小不能找过2mb')
  }
  if (status && isLt2M) {
    fileList.value = [...(fileList.value || []), file]
    // console.log('上传', file)
    // const result = await handleServiceData(file)
    // const idx = fileList.value.findIndex((item) => item.uid === file.uid)
    // if (idx !== -1) {
    //   const newFileList = fileList.value.slice()
    //   console.log('===上传成功', result, idx)
    //   newFileList.splice(idx, 1, { ...fileList.value[idx], ...result })
    //   fileList.value = newFileList
    // }
  } else {
    errorIds.push(file.uid)
  }
  return false
}

const previewVisible = ref(false)
const setVisible = (value) => {
  previewVisible.value = value
}
const previewList = ref(props.value?.map((item) => item.url) ?? [])
const getPreviewList = (res) => {
  let arr = []
  res?.map(async (file) => {
    arr.push(file.url || file.preview)
  }) ?? []
  previewList.value = arr
}
const previewCurrent = ref(0)
const handlePreview = async (file) => {
  previewCurrent.value = fileList.value.findIndex((item) => item.uid === file.uid)
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj)
    fileList.value[previewCurrent.value].preview = file.preview
  }
  getPreviewList(fileList.value)
  setVisible(true)
}
watchDebounced(
  fileList,
  (res) => {
    getPreviewList(res)
    emits('update:value', res)
    emits('change', res)
  },
  { debounce: 300, maxWait: 1000 }
)
</script>
<style scoped></style>
