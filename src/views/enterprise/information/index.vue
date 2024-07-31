<!-- information -->
<template>
  <section section-content>
    <a-tabs v-model:activeKey="activeKey" @change="handleChangeTab">
      <a-tab-pane v-for="item in tabList" :key="item.key" :tab="item.tab">
        <a-skeleton active :loading="!item.loaded">
          <component
            class="max-w-500"
            :is="item.components"
            :info="item.info"
            :disabled="false"
          ></component>
        </a-skeleton>
      </a-tab-pane>
    </a-tabs>
  </section>
  <context-holder />
</template>

<script setup>
import { message } from 'ant-design-vue'
// import { useDebounceFn } from '@vueuse/core'
import { getCompanyInfo } from 'service/api'
import { computed, markRaw, ref } from 'vue'
const [messageApi, contextHolder] = message.useMessage()
import BaseForm from './BaseForm'
import QualificationForm from './QualificationForm'
defineOptions({
  name: 'EnterpriseInformationIndex'
})
const activeKey = ref('1')
const tabList = ref([
  {
    key: '1',
    tab: '基础信息',
    loaded: false,
    components: markRaw(BaseForm),
    info: {},
    query: {
      companyId: '1687065399410475009'
    }
  },
  {
    key: '2',
    tab: '资质信息',
    loaded: false,
    components: markRaw(QualificationForm),
    info: {},
    query: {
      companyId: '1687065399410475009'
    }
  }
])
const current = computed(() => tabList.value.findIndex((item) => item.key === activeKey.value))
// const loading = ref(false)
/**
 * @description: 格式化菜单数据
 */
const formatData = (data = {}) => {
  const { companyId = '', companyName = '', contactName = '', contactMobile = '' } = data
  const tmp = {
    1: () => {
      return {
        companyId,
        companyName,
        contactName,
        contactMobile
      }
    },
    2: () => {
      return data
    }
  }
  return tmp[activeKey.value]()
}
/**
 * @description: 初始菜单数据
 */
const getTabData = async () => {
  if (tabList.value[current.value].loaded) return
  const res = await getCompanyInfo(tabList.value[current.value].query)
  tabList.value[current.value].loaded = true
  tabList.value[current.value].info = formatData(res?.data || {})
}
getTabData('1')
const handleChangeTab = (val = '1') => {
  console.log('val', val)
  getTabData(val)
  messageApi.success('切换成功')
}
</script>
<style scoped></style>
