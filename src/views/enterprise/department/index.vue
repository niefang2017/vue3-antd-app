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
          <a-form-item name="name">
            <a-input
              :maxlength="20"
              v-model:value="formState.name"
              placeholder="请输入部门名称"
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
      <a-button type="primary" @click="onEdit(0)">
        <template #icon>
          <PlusOutlined />
        </template>
        添加部门
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
        <template v-if="column.dataIndex === 'operation'">
          <a class="color-primary ml5 mr5 whitespace-nowrap" @click="onEdit(1, record)">编辑</a>
          <a class="color-primary ml5 mr5 whitespace-nowrap" @click="onEdit(2, record)">
            新增子部门
          </a>
          <a-popconfirm v-if="dataSource.length" title="确定删除?" @confirm="onEdit(3, record)">
            <a class="color-primary ml5 mr5 whitespace-nowrap">删除</a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </section>
  <edit ref="editRef" :treeList="dataSource" @change="handleChangeEdit" />
  <context-holder />
</template>

<script setup>
defineOptions({
  name: 'DepartmentIndex'
})
// import { useRouter } from 'vue-router'
import { PlusOutlined } from '@ant-design/icons-vue'
import { useDebounceFn } from '@vueuse/core'
import { message } from 'ant-design-vue'
import { delDepartmentById, getDepartmentList } from 'service/api'
import { changeTreeData, formatTreeData } from 'utils/menu'
import { reactive, ref, shallowRef } from 'vue'

import Edit from './Edit'
const [messageApi, contextHolder] = message.useMessage()
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
    title: '部门名称',
    width: 300,
    dataIndex: 'name',
    fixed: 'left',
    align: 'left'
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
const editRef = shallowRef(null)
const dataSource = ref([])

const formRef = ref()
const formState = ref({
  name: '',
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
    const res = await getDepartmentList(params)
    const list = res?.data?.list ?? []
    if (res?.code === 1 && Array.isArray(list)) {
      dataSource.value = formatTreeData(list)
      console.log('数据', dataSource.value)
      tableObj.total = res.data.total
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
    const res = await delDepartmentById({ id })
    console.log('res', res)
    if (res.code !== 0) return
    // dataSource.value = dataSource.value.filter((item) => item.id !== id)
    // const index = dataSource.value.findIndex((item) => item.id === id)
    // if (index !== -1) {
    //   dataSource.value.splice(index, 1)
    // }
    messageApi.success('删除接口成功！')
  } catch (error) {
    console.log('删除error', error)
  }
}

// 编辑
/**
 * @description 处理编辑弹框回调
 * @param {Number} type 0:新增,1:编辑:3:添加下级菜单
 * @param {Object} row 当前数据
 */
const handleChangeEdit = (type = 0, row) => {
  //需要查询列表接口
  const tmp = {
    0: () => {
      dataSource.value.push({ ...row, isRoot: true })
    },
    1: () => {
      dataSource.value = changeTreeData(dataSource.value, 'key', row.key, row)
    },
    2: () => {
      dataSource.value = changeTreeData(dataSource.value, 'key', row.parentId, row, true)
    }
  }
  tmp[type]()
}
/**
 * @description 部门操作
 * @param {Object} row 当前数据
 * @param {Number} type 0:新增,1:编辑,2:新增子部门,3:删除
 */

const btnLoading = ref(Array(7).fill(false))
const onEdit = useDebounceFn(
  async (type, row) => {
    if (btnLoading[type]) return
    btnLoading[type] = true
    const tmps = {
      0: () => editRef.value.open(type),
      1: () => editRef.value.open(type, row),
      2: () => editRef.value.open(type, { parentId: row.key ?? '' }),
      3: async () => await onDelete(row.id)
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
  name: [
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
