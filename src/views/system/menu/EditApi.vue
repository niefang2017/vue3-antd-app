<!-- EditMenu -->
<template>
  <a-drawer :open="show" title="关联api" placement="right" :width="700" @close="close(0)">
    <a-form
      :model="formState"
      layout="inline"
      ref="formRef"
      autocomplete="off"
      @finish="onFinish"
      v-bind="formItemLayout"
    >
      <a-row :gutter="16">
        <a-col :span="11">
          <a-form-item label="接口名称" name="name">
            <a-input
              :maxlength="100"
              v-model:value="formState.name"
              placeholder="请输入接口名称"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="11">
          <a-form-item label="接口地址" name="url">
            <a-input
              v-model:value="formState.url"
              :maxlength="2000"
              placeholder="请输入接口地址"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="2" style="text-align: right">
          <a-button html-type="submit" :loading="loading.search">查询</a-button>
        </a-col>
      </a-row>
    </a-form>
    <!-- table -->
    <section mt16>
      <a-table :columns="columns" :data-source="dataSource" bordered>
        <template #bodyCell="{ column, text, record }">
          <template v-if="['name', 'url'].includes(column.dataIndex)">
            <div :key="record.key">
              {{ text }}
            </div>
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <a-space>
              <a class="color-primary" @click="handleClick(1, record)">编辑</a>
              <a-popconfirm title="确定取消关联?" @confirm="handleClick(2, record)">
                <a class="color-primary">取消关联</a>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </section>
    <template #extra>
      <a-space>
        <a-button type="primary" @click="handleClick(0)" :loading="loading.plus"
          >添加关联api</a-button
        >
      </a-space>
    </template>
    <a-drawer
      v-model:open="showEdit"
      @close="close(1)"
      :title="editType === 1 ? '编辑关联api' : '添加关联api'"
      :width="500"
      :closable="false"
    >
      <a-form
        :model="editFormState"
        :rules="formRules"
        ref="editRef"
        autocomplete="off"
        layout="horizontal"
        v-bind="formItemLayout"
      >
        <a-form-item label="接口名称" name="name">
          <a-input
            :maxlength="100"
            v-model:value="editFormState.name"
            placeholder="请输入接口名称"
          ></a-input>
        </a-form-item>
        <a-form-item label="接口地址" name="url">
          <a-input
            v-model:value="editFormState.url"
            :maxlength="2000"
            placeholder="请输入接口地址"
          ></a-input>
        </a-form-item>
      </a-form>
      <template #extra>
        <a-space>
          <a-button type="primary" @click="handleClick(3)" :loading="loading.save">保存</a-button>
        </a-space>
      </template>
    </a-drawer>
  </a-drawer>
  <context-holder />
</template>

<script setup>
import { TrademarkOutlined } from '@ant-design/icons-vue'
import { useDebounceFn } from '@vueuse/core'
import { message } from 'ant-design-vue'
import { deepClone } from 'utils/tool'
import { ref, shallowRef } from 'vue'
const [messageApi, contextHolder] = message.useMessage()
defineOptions({ name: 'EditApi' })
// const emits = defineEmits(['change'])
const formRef = shallowRef()
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
  name: '', // 接口名称
  url: '', //排序
  id: '' //菜单关联id
}
const formState = ref(deepClone(defaultForm))
// 规则
const formRules = ref({
  name: [
    {
      required: true,
      message: '请输入菜单名称'
    }
  ],
  url: [
    {
      required: true,
      message: '请输入菜单名称'
    }
  ]
})
/**
 * @description 提交
 */
const loading = ref({
  search: false,
  plus: false,
  save: false
})
const onFinish = (values) => {
  loading.value.search = true
  console.log('values', values)
  loading.value.search = false
  messageApi.success('查询')
}

const columns = [
  {
    title: '接口名称',
    dataIndex: 'name',
    width: '40%',
    align: 'center'
  },
  {
    title: '接口url',
    dataIndex: 'url',
    width: '40%',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    align: 'center'
  }
]
const data = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    url: `London Park no. ${i}`
  })
}
const dataSource = ref(data)

const showEdit = ref(false)
const editRef = shallowRef(null)
const editFormState = ref(deepClone(defaultForm))
const editType = ref(0)
/**
 * @description 处理点击
 * @param {Number} type 0:新增,1:编辑,2:删除,3:保存
 */
const handleClick = useDebounceFn(
  (type = 0, record = {}) => {
    const tmp = {
      0: () => {
        showEdit.value = true
        editFormState.value = {
          key: 'custome-' + data.length,
          name: ``,
          url: ``
        }
        editType.value = type
      },
      1: () => {
        editType.value = type
        showEdit.value = true
        editFormState.value = deepClone(record)
      },
      2: () => {
        dataSource.value = dataSource.value.filter((item) => record.key !== item.key)
      },
      3: () => {
        editRef.value
          .validate()
          .then(() => {
            const params = deepClone(editFormState.value)
            console.log('val', params)
            loading.value.save = TrademarkOutlined
            const idx = dataSource.value.findIndex((item) => params.key === item.key)
            if (idx === -1) {
              dataSource.value.unshift(params)
            } else {
              dataSource.value[idx] = params
            }
            messageApi.success('保存成功')
            close(1)
            loading.value.save = false
          })
          .catch((error) => {
            console.log('error', error)
            loading.value.save = false
          })
      }
    }
    tmp[type]()
  },
  100,
  {
    leading: true,
    trailing: false
  }
)

const open = (params = {}) => {
  show.value = true
  formState.value.id = params?.id || ''
  console.log('formState.value', formState.value)
}
/**
 * @description 关闭编辑框
 * @param {Number} type 0 关闭api 1 关闭编辑
 */
const close = (type = 0) => {
  const tmp = {
    0: () => {
      // dataSource.value = []
      formState.value = deepClone(defaultForm)
      loading.value.search = false
      show.value = false
    },
    1: () => {
      editFormState.value = {}
      loading.value.save = false
      showEdit.value = false
    }
  }
  tmp[type]()
}

defineExpose({
  open,
  close
})
</script>
<style scoped></style>
