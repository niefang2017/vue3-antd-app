<!-- 系统设置 -->
<template>
  <section section-search>
    <a-form
      ref="formRef"
      :model="formState"
      @finish="onFinish"
      layout="inline"
      :rules="formRules"
      bordered
      autocomplete="off"
    >
      <a-row w-full :gutter="[0, 16]">
        <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="4" :xxxl="4">
          <a-form-item name="name">
            <a-input
              :maxlength="20"
              v-model:value="formState.name"
              placeholder="请输入员工名称"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="4" :xxxl="4">
          <a-form-item name="mobile">
            <a-input
              :maxlength="11"
              v-model:value="formState.mobile"
              placeholder="请输入员工手机号"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="4" :xxxl="4">
          <a-form-item name="status">
            <a-select
              v-model:value="formState.status"
              :options="menuStatusOptions"
              placeholder="请选择菜单状态"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col style="text-align: right">
          <a-button type="primary" html-type="submit" :loading="tableObj.loading">查询</a-button>
          <a-button
            style="margin: 0 8px"
            @click="
              () => {
                formRef.resetFields()
                formState.pageNo = 1
              }
            "
          >
            清除
          </a-button>
        </a-col>
      </a-row>
    </a-form>
  </section>
  <section section-content mt10>
    <!-- 表格工具 -->
    <div pb-16>
      <a-button type="primary" @click="handleClick(0)">
        <template #icon>
          <PlusOutlined />
        </template>
        添加员工
      </a-button>
    </div>
    <a-table
      :sticky="true"
      class="ant-table-striped"
      :loading="tableObj.loading"
      :columns="columns"
      :data-source="dataSource"
      bordered
      :pagination="{
        hideOnSinglePage: true,
        total: 50,
        showTotal: (total) => `共 ${total} 条`
      }"
      :scroll="{
        scrollToFirstRowOnChange: true,
        x: 1000
      }"
      @change="onTableChange"
      @resizeColumn="handleResizeColumn"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex === 'index'">
          <span>{{ (formState.pageNo - 1) * formState.pageSize + index + 1 }}</span>
        </template>
        <template v-if="column.dataIndex === 'status'">
          <a-badge v-if="record.status !== 1" status="error" text="禁用" />
          <a-badge v-else status="success" text="启用" />
        </template>
        <template v-if="column.dataIndex === 'roleNameList'">
          <a-tag
            v-for="(tag, idx) in record.roleNameList"
            :key="idx"
            :color="tag === '超级管理员' ? 'volcano' : 'green'"
          >
            {{ tag }}
          </a-tag>
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <a-popconfirm
            v-if="dataSource.length && record.status === 1"
            title="确定禁用?"
            @confirm="handleClick(2, record)"
          >
            <a class="color-primary ml5 mr5 whitespace-nowrap">禁用</a>
          </a-popconfirm>
          <a
            v-if="record.status !== 1"
            class="color-primary ml5 mr5 whitespace-nowrap"
            @click="handleClick(3, record)"
            >启用</a
          >
          <a class="color-primary ml5 mr5 whitespace-nowrap" @click="handleClick(1, record)"
            >修改</a
          >
          <a-popconfirm
            v-if="dataSource.length"
            title="确定删除?"
            @confirm="handleClick(4, record)"
          >
            <a class="color-primary ml5 mr5 whitespace-nowrap">删除</a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </section>
  <employee-edit ref="editRef" :treeList="treeList" @change="handleChangeEdit" />
  <context-holder />
</template>

<script setup>
defineOptions({
  name: 'EnterpriseEmployeeIndex'
})
import { PlusOutlined } from '@ant-design/icons-vue'
import { useDebounceFn } from '@vueuse/core'
import { message } from 'ant-design-vue'
import { menuStatusList, roleTypeList } from 'constants/index'
import {
  changeEmployeeStatus,
  delEmployeeById,
  getDepartmentList,
  getEmployeeList
} from 'service/api'
import { reactive, ref, shallowRef } from 'vue'

import EmployeeEdit from './EmployeeEdit'
const [messageApi, contextHolder] = message.useMessage()
const menuStatusOptions = ref(menuStatusList)

const columns = [
  {
    title: '序号',
    width: 70,
    dataIndex: 'index',
    fixed: 'left',
    align: 'center'
  },
  {
    title: '员工名称',
    width: 160,
    dataIndex: 'name',
    fixed: 'left',
    align: 'center',
    resizable: true
  },
  {
    title: '手机号',
    width: 160,
    dataIndex: 'mobile',
    align: 'center'
  },
  {
    title: '所属部门',
    dataIndex: 'department',
    width: 160,
    align: 'center'
  },
  {
    title: '角色',
    dataIndex: 'roleNameList',
    width: 200,
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 120,
    fixed: 'right',
    align: 'center'
  }
]
if (window.innerWidth < 768) {
  columns[0].fixed = false
  columns[1].fixed = false
  columns[columns.length - 1].fixed = false
}
const tableObj = reactive({
  loading: false,
  total: 0
})
const editRef = shallowRef()
const dataSource = ref([])

const formRef = ref()
const formState = ref({
  name: '',
  mobile: '',
  status: null, //1:启用：0：禁用
  pageNo: 1,
  pageSize: 10
})

/**
 * @description: 获取角色类型
 */
const getFormatRoleType = () => {
  return roleTypeList.reduce((acc, item) => {
    acc[item.value] = item.label
    return acc
  }, {})
}
/**
 * @description: 查询列表
 * @method getIdiomList
 * @param {*} params
 * @return {*}
 */

const search = async (params = {}) => {
  tableObj.loading = true
  try {
    const res = await getEmployeeList(params)
    const types = getFormatRoleType()
    let list = res?.data?.list ?? []
    list =
      list?.map((item) => {
        item.roleNameList = item.roleList.map((item) => {
          return types[item]
        })
        return item
      }) ?? []
    dataSource.value = list
    tableObj.total = res.data?.total ?? 0
    tableObj.loading = false
    console.log('查询列表params', params, dataSource.value)
  } catch (error) {
    dataSource.value = []
    tableObj.total = 0
    tableObj.loading = false
  }
  tableObj.loading = false
}

const onDelete = async (id) => {
  console.log('删除', id)
  try {
    const res = await delEmployeeById(id)
    console.log('res', res)
    if (res.code !== 1) return Promise.resolve(false)
    const index = dataSource.value.findIndex((item) => item.id === id)
    if (index !== -1) {
      dataSource.value.splice(index, 1)
    }
    console.log('dataSource.value', dataSource.value)
    messageApi.success('删除成功！')
    return Promise.resolve(true)
  } catch (error) {
    console.log('删除error', error)
    return Promise.resolve(false)
  }
}

/**
 * @description 启用/禁用菜单
 * @param {Object} row 当前数据
 */
const onChangeStatus = async (row) => {
  try {
    const res = await changeEmployeeStatus({ id: row.id, status: row.status === 1 ? 0 : 1 })
    if (res?.code !== 1) return Promise.resolve(false)
    const index = dataSource.value.findIndex((item) => item.id === row.id)
    if (index !== -1) {
      dataSource.value.splice(index, 1, { ...row, status: row.status === 1 ? 0 : 1 })
    }
    messageApi.success(row.status === 0 ? '已启用！' : '已禁用！')
    return Promise.resolve(true)
  } catch (error) {
    console.log('启用/禁用菜单error', error)
    return Promise.resolve(false)
  }
}
/**
 * @description 菜单操作
 * @param {Object} row 当前数据
 * @param {Number} type 0:新增,1:修改,2:禁用,3:启用,4:删除
 */
const btnLoading = ref(Array(3).fill(false))
const handleClick = useDebounceFn(
  async (type, row = {}) => {
    if (btnLoading[type]) return
    btnLoading[type] = true
    const { id = '', name = '', mobile = '', department = '', roleList = [] } = row
    const tmps = {
      0: () => editRef.value.open(type),
      1: () =>
        editRef.value.open(type, {
          id,
          name,
          mobile,
          department,
          roleList
        }),
      2: async () => await onChangeStatus(row),
      3: async () => await onChangeStatus(row),
      4: async () => await onDelete(row.id)
    }
    await tmps[type]()
    btnLoading[type] = false
  },
  100,
  {
    leading: true,
    trailing: false
  }
)
search(formState.value)
// table改变
const onTableChange = (pagination, filters, sorter) => {
  console.log('表格更改', pagination, filters, sorter)
}
const formRules = reactive({
  title: [
    {
      required: false,
      message: '名称不能为空'
    }
  ]
})

const onFinish = (values) => {
  search(values)
}
/**
 * @description 更改表格大小
 */
const handleResizeColumn = (w, col) => {
  col.width = w
}
/**
 * @description: 查询菜单权限列表
 */
const treeList = ref([])
const getAuthList = async (params = {}) => {
  console.log('查询列表params', params)
  tableObj.loading = true
  try {
    const res = await getDepartmentList(params)
    const list = res?.data?.list ?? []
    if (res?.code === 1 && Array.isArray(list)) {
      treeList.value = list
      console.log('treeList.value', treeList.value)
    } else {
      treeList.value = []
    }
  } catch (error) {
    treeList.value = []
  }
}
getAuthList()

/**
 * @description 处理编辑弹框回调
 * @param {Object} row 当前数据
 */
const handleChangeEdit = (val = {}) => {
  console.log('处理菜单更新', val)
  const { id = '', name = '', mobile = '', department = '', roleList = [] } = val
  const idx = dataSource.value.findIndex((item) => item.id === id)
  if (idx === -1) return
  dataSource.value.splice(idx, 1, {
    ...dataSource.value[idx],
    name,
    mobile,
    department,
    roleList
  })
}
</script>
<style scoped></style>
