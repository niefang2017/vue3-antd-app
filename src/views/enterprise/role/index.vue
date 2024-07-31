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
              placeholder="请输入角色名称"
            ></a-input>
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
        添加角色
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
        <template v-if="column.dataIndex === 'desc'">
          <a-tooltip placement="top">
            <template #title>
              {{ record.desc }}
            </template>
            <div text-truncate>{{ record.desc }}</div>
          </a-tooltip>
        </template>
        <template v-if="column.dataIndex === 'num'">
          <router-link block color-primary to="/enterprise/employee">
            {{ record.num }}
          </router-link>
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <a class="color-primary ml-5 mr-5 whitespace-nowrap" @click="handleClick(1, record)"
            >修改</a
          >
          <a-popconfirm
            v-if="dataSource.length"
            title="确定删除?"
            @confirm="handleClick(2, record)"
          >
            <a class="color-primary ml-5 mr-5 whitespace-nowrap">删除</a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </section>
  <RoleEdit ref="editRef" :menuList="menuList" @change="handleChangeEdit" />
  <context-holder />
</template>

<script setup>
defineOptions({
  name: 'EnterpriseRoleIndex'
})
import { PlusOutlined } from '@ant-design/icons-vue'
import { useDebounceFn } from '@vueuse/core'
import { message } from 'ant-design-vue'
import { delRoleById, getMenuList, getUserRoleList } from 'service/api'
import { formatMenuTreeData } from 'utils/menu'
import { reactive, ref, shallowRef } from 'vue'

import RoleEdit from './RoleEdit'
const [messageApi, contextHolder] = message.useMessage()

const columns = [
  {
    title: '序号',
    width: 70,
    dataIndex: 'index',
    fixed: 'left',
    align: 'center'
  },
  {
    title: '角色名称',
    width: 160,
    dataIndex: 'name',
    fixed: 'left',
    align: 'center',
    resizable: true
  },
  {
    title: '角色描述',
    width: 300,
    dataIndex: 'desc',
    align: 'center',
    resizable: true
  },
  {
    title: '员工数量',
    dataIndex: 'num',
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
  status: null, //1:启用：0：禁用
  pageNo: 1,
  pageSize: 10
})

/**
 * @description: 查询列表
 * @method getIdiomList
 * @param {*} params
 * @return {*}
 */

const search = async (params = {}) => {
  tableObj.loading = true
  try {
    const res = await getUserRoleList(params)
    dataSource.value = res?.data?.list ?? []
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
    const res = await delRoleById(id)
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
 * @description 菜单操作
 * @param {Object} row 当前数据
 * @param {Number} type 0:新增,1:修改,2:删除
 * */
const btnLoading = ref(Array(3).fill(false))
const handleClick = useDebounceFn(
  async (type, row) => {
    if (btnLoading[type]) return
    btnLoading[type] = true
    const tmps = {
      0: () => editRef.value.open(type),
      1: () =>
        editRef.value.open(type, {
          name: row.name,
          desc: row.desc,
          id: row.id,
          authList: row?.authList ?? []
        }),
      2: async () => await onDelete(row.id)
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
const menuList = ref([])
const getAuthList = async (params = {}) => {
  console.log('查询列表params', params)
  tableObj.loading = true
  try {
    const res = await getMenuList(params)
    if (res?.code === 1 && Array.isArray(res?.data ?? [])) {
      menuList.value = formatMenuTreeData(res?.data ?? [])
      console.log('menuList.value', menuList.value)
    } else {
      menuList.value = []
    }
  } catch (error) {
    menuList.value = []
  }
}
getAuthList()

/**
 * @description 处理编辑弹框回调
 * @param {Object} row 当前数据
 */
const handleChangeEdit = (val = {}) => {
  console.log('处理菜单更新', val)
  const { id = '', roleName = '', roleDesc = '', authList = [] } = val
  dataSource.value.forEach((item) => {
    if (item.id === id) {
      item.name = roleName
      item.desc = roleDesc
      item.authList = authList
    }
  })
  // formState.value.pageNo = 1
  // getAuthList()
}
</script>
<style scoped></style>
