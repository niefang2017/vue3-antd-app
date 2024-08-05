<!-- menu-group -->
<template>
  <section section-content pt-0>
    <a-tabs v-model:activeKey="activeKey" @change="handleChangeTab">
      <a-tab-pane v-for="item in tabList" :key="item.key" :tab="item.tab">
        <!-- <i
            v-if="!item.loaded"
            class="i-ant-design:loading-outlined text-30 color-primary animate-spin"
          ></i> -->
        <a-skeleton active :loading="!item.loaded">
          <a-form
            :model="{ checkedKeys: item.checkedKeys }"
            :rules="formRules"
            layout="horizontal"
            ref="formRef"
          >
            <a-form-item name="checkedKeys" class="mb0" :style="{ height: `${menuHeight + 40}px` }">
              <use-tree-form
                v-if="item.list.length"
                v-model:value="item.checkedKeys"
                :treeData="item.list"
                :height="menuHeight"
                @change="validateFields(['checkedKeys'])"
              ></use-tree-form>
              <a-empty v-else mt-100 />
            </a-form-item>
            <div v-if="item.list.length" class="p16 border-t border-t-gray-100 border-t-solid">
              <a-button type="primary" :loading="loading" @click="handleSave"> 保存设置 </a-button>
            </div>
          </a-form>
        </a-skeleton>
      </a-tab-pane>
    </a-tabs>
  </section>
  <context-holder />
</template>

<script setup>
import { useDebounceFn, useWindowSize } from '@vueuse/core'
import { message } from 'ant-design-vue'
import UseTreeForm from 'components/UseTreeForm'
import { formatMenuTreeData } from 'utils/menu'
import { computed, ref, shallowRef, toRaw } from 'vue'

import { getMenuList } from '@/service/constants/menu'
const [messageApi, contextHolder] = message.useMessage()
defineOptions({ name: 'MenuGroup' })
const activeKey = ref('1')
const tabList = ref([
  {
    key: '1',
    tab: '个人组织',
    list: [],
    loaded: false,
    checkedKeys: ['dashboard:analysis', 'role']
  },
  {
    key: '2',
    tab: '企业组织',
    list: [],
    loaded: false,
    checkedKeys: ['service', 'version', 'product:setting', 'product:library', 'product']
  }
])
const current = computed(() => tabList.value.findIndex((item) => item.key === activeKey.value))
const loading = ref(false)
// 规则
const validateCheckedKeys = async (_rule) => {
  const value = tabList.value[current.value].checkedKeys
  if (!value || !value.length) {
    return Promise.reject(_rule.message)
  } else {
    return Promise.resolve()
  }
}
const formRules = ref({
  checkedKeys: [
    {
      type: 'array',
      required: true,
      message: '请选择权限',
      trigger: 'change',
      validator: validateCheckedKeys
    }
  ]
})
/**
 * @description: 保存菜单
 */
const formRef = shallowRef(null)
/**
 * @description 校验字段
 */
const validateFields = (fields = []) => {
  console.log('fields', fields)
  if (!fields?.length) return
  formRef.value[current.value].validateFields(fields)
}
const handleSave = useDebounceFn(() => {
  if (!formRef?.value?.[current.value]) return
  formRef.value[current.value]
    .validate()
    .then(() => {
      loading.value = true
      const params = toRaw(tabList.value[current.value].checkedKeys)
      console.log('保存数据', params)
      messageApi.success('保存成功')
      loading.value = false
    })
    .catch((error) => {
      console.log('error', error)
      loading.value = false
    })
}, 100)
const handleChangeTab = (val = '1') => {
  console.log('val', val)
  getTabData(val)
}

/**
 * @description: 初始菜单数据
 */
const getTabData = async () => {
  if (tabList.value[current.value].loaded) return
  const res = await getMenuList({ id: activeKey.value })
  if (res?.code !== 1 || !res?.data?.length) {
    tabList.value[current.value].loaded = true
    tabList.value[current.value].list = []
    return
  }
  tabList.value[current.value].loaded = true
  tabList.value[current.value].list = formatMenuTreeData(res.data || [])
}
getTabData()
const menuHeight = computed(() => {
  const { height } = useWindowSize()
  return height.value - 64 - 42 - 46 - 90 - 40
})
</script>
<style scoped></style>
