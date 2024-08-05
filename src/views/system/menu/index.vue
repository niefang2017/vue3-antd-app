<!-- 系统设置 -->
<template>
  <section section-search>
    <a-form
      ref="formRef"
      class="ant-advanced-search-form"
      :model="formState"
      @finish="onFinish"
      layout="inline"
      :rules="formRules"
      bordered
      autocomplete="off"
    >
      <a-row w-full :gutter="[0, 16]">
        <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="4" :xxxl="4">
          <a-form-item name="title">
            <a-input
              :maxlength="20"
              v-model:value="formState.title"
              placeholder="请输入菜单名称"
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
      <a-button type="primary" @click="onEdit(0)">
        <template #icon>
          <PlusOutlined />
        </template>
        添加菜单
      </a-button>
    </div>
    <a-table
      :sticky="true"
      class="ant-table-striped"
      :loading="tableObj.loading"
      :columns="columns"
      :data-source="dataSource"
      :pagination="false"
      bordered
      @change="onTableChange"
      @resizeColumn="handleResizeColumn"
    >
      <template #bodyCell="{ column, record }">
        <!-- <template v-if="column.dataIndex === 'index'">
          <span>{{ (formState.pageNo - 1) * formState.pageSize + index + 1 }}</span>
        </template> -->
        <template v-if="column.dataIndex === 'icon'">
          <template v-if="record?.icon">
            <Icon v-if="typeof record.icon === 'string'" :icon="record.icon" />
            <component v-else :is="record.icon" />
          </template>
        </template>
        <template v-if="column.dataIndex === 'status'">
          <a-badge v-if="record.status !== 1" status="error" text="禁用" />
          <a-badge v-else status="success" text="启用" />
        </template>
        <template v-if="column.dataIndex === 'menuType'">
          <span>
            {{ menuTypeOptions.find((item) => item.value === record.menuType)?.label ?? '' }}
          </span>
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <a class="color-primary ml5 mr5 whitespace-nowrap" @click="onEdit(1, record)">关联api</a>
          <a-popconfirm
            v-if="dataSource.length && record.status === 1"
            title="确定禁用?"
            @confirm="onEdit(2, record)"
          >
            <a class="color-primary ml5 mr5 whitespace-nowrap">禁用</a>
          </a-popconfirm>
          <a
            v-if="record.status !== 1"
            class="color-primary ml5 mr5 whitespace-nowrap"
            @click="onEdit(3, record)"
            >启用</a
          >
          <a class="color-primary ml5 mr5 whitespace-nowrap" @click="onEdit(4, record)"
            >添加下级菜单</a
          >
          <a class="color-primary ml5 mr5 whitespace-nowrap" @click="onEdit(5, record)">编辑</a>
          <a-popconfirm v-if="dataSource.length" title="确定删除?" @confirm="onEdit(6, record)">
            <a class="color-primary ml5 mr5 whitespace-nowrap">删除</a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </section>
  <edit-menu ref="editRef" :menuList="dataSource" @change="handleChangeEdit" />
  <edit-api ref="editApiRef" />
  <context-holder />
</template>

<script setup>
defineOptions({
  name: 'SystemMenuIndex'
})
// import { useRouter } from 'vue-router'
import { PlusOutlined } from '@ant-design/icons-vue'
import { useDebounceFn } from '@vueuse/core'
import { message } from 'ant-design-vue'
import Icon from 'components/Icon/index'
import { menuStatusList, menuTypeList } from 'constants/index'
import { changeRoleStatus,delMenuById, getMenuList } from 'service/api'
import { changeTreeData,formatMenuTreeData } from 'utils/menu'
import { reactive, ref, shallowRef } from 'vue'

import EditApi from './EditApi'
import EditMenu from './EditMenu'
const [messageApi, contextHolder] = message.useMessage()
const menuStatusOptions = ref(menuStatusList)
const menuTypeOptions = ref(menuTypeList)
// const router = useRouter()

const columns = [
  // {
  //   title: '序号',
  //   width: 70,
  //   dataIndex: 'index',
  //   fixed: 'left',
  //   align: 'center'
  // },
  {
    title: '菜单名称',
    width: 140,
    dataIndex: 'title',
    fixed: 'left',
    align: 'center'
  },
  {
    title: '菜单图标',
    width: 100,
    dataIndex: 'icon',
    align: 'center'
  },
  {
    title: '菜单类型',
    dataIndex: 'menuType',
    width: 100,
    align: 'center'
  },
  {
    title: '菜单url',
    dataIndex: 'path',
    width: 300,
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    fixed: 'right',
    width: 200,
    align: 'center'
  }
]
if (window.innerWidth < 768) {
  columns[0].fixed = false
  columns[1].fixed = false
  console.log('=columns', columns.length)
  columns[columns.length - 1].fixed = false
}
const tableObj = reactive({
  loading: false,
  total: 0
})
const editRef = ref()
const dataSource = ref([])

const formRef = ref()
const formState = ref({
  title: '',
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
  console.log('查询列表params', params)
  tableObj.loading = true
  try {
    const res = await getMenuList(params)
    if (res?.code === 1 && Array.isArray(res?.data ?? [])) {
      dataSource.value = formatMenuTreeData(res?.data ?? [], true)
      tableObj.total = res.data.length
    } else {
      dataSource.value = []
      tableObj.total = 0
    }
    tableObj.loading = false
  } catch (error) {
    dataSource.value = []
    tableObj.total = 0
    tableObj.loading = false
  }
  tableObj.loading = false
}

// 删除
const onDelete = async (id) => {
  console.log('删除', id)
  try {
    const res = await delMenuById({ id })
    console.log('res', res)
    if (res.code !== 0) return
    // dataSource.value = dataSource.value.filter((item) => item.id !== id)
    // const index = dataSource.value.findIndex((item) => item.id === id)
    // if (index !== -1) {
    //   dataSource.value.splice(index, 1)
    // }
    messageApi.success('测试删除成功！')
  } catch (error) {
    console.log('删除error', error)
  }
}
/**
 * @description 启用/禁用菜单
 * @param {Object} row 当前数据
 */
const onChangeStatus = async (row = {}) => {
  const { status, key } = row
  try {
    const res = await changeRoleStatus({ id: key, status: status === 1 ? 0 : 1 })
    if (res?.code !== 1) return Promise.resolve(false)

    // const index = dataSource.value.findIndex((item) => item.id === id)
    // if (index !== -1) {
    //   dataSource.value.splice(index, 1, { ...row, status: status === 1 ? 0 : 1 })
    // }
    dataSource.value = changeTreeData(dataSource.value, 'key', key, {
      ...row,
      status: status === 1 ? 0 : 1
    })
    messageApi.success(status === 0 ? '已启用！' : '已禁用！')
    return Promise.resolve(true)
  } catch (error) {
    console.log('启用/禁用菜单error', error)
    return Promise.resolve(false)
  }
}
// 编辑
/**
 * @description 关联api
 * @param {Object} row 当前数据
 */
const editApiRef = shallowRef(null)
const onEditApi = (row) => {
  console.log('打开关联api', row)
  editApiRef.value.open(row)
}
/**
 * @description 处理编辑弹框回调
 * @param {Number} type 0:新增,4:添加下级菜单,5:编辑
 * @param {Object} row 当前数据
 */
const handleChangeEdit = (type = 0, row) => {
  //需要查询列表接口
  const tmp = {
    0: () => {
      dataSource.value.push({ ...row, isRoot: true })
    },
    4: () => {
      dataSource.value = changeTreeData(dataSource.value, 'key', row.parentId, row, true)
    },
    5: () => {
      console.log('编辑', row, dataSource.value)
      dataSource.value = changeTreeData(dataSource.value, 'key', row.key, row)
    }
  }
  tmp[type]()
}
/**
 * @description 菜单操作
 * @param {Object} row 当前数据
 * @param {Number} type 0:新增,1:关联api,2:禁用,3:启用,4:添加下级菜单,5:编辑,6:删除
 */

const btnLoading = ref(Array(7).fill(false))
const onEdit = useDebounceFn(
  async (type, row) => {
    if (btnLoading[type]) return
    btnLoading[type] = true
    console.log('row', row)
    const tmps = {
      0: () => editRef.value.open(type),
      1: () => onEditApi(row),
      2: async () => await onChangeStatus(row),
      3: async () => await onChangeStatus(row),
      4: () => editRef.value.open(type, { menuType: 2, parentId: row.key ?? '' }),
      5: () => editRef.value.open(type, { ...row, menuType: 2, parentId: row.parentId ?? '' }),
      6: async () => await onDelete(row.id)
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
  console.log('更改表格大小', w, col)
  col.width = w
}
// /**
//  * @description: 子组件更新保存
//  * @param {*} data
//  * @return {*}
//  */
// const update = () => {
//   search(formState)
// }
</script>
<style scoped></style>
