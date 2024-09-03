<template>
  <a-sub-menu :key="menuInfo.key" :class="prefixCls">
    <template #icon v-if="menuInfo.icon">
      <NIcon v-if="typeof menuInfo.icon === 'string'" :icon="menuInfo.icon" />
      <component v-else :is="menuInfo.icon" />
    </template>
    <template #title>{{ menuInfo.title }}</template>
    <template v-for="item in menuInfo.children" :key="item.key">
      <template v-if="!item.children">
        <a-menu-item :key="item.key" @click="handleRoute(item)">
          <template #icon v-if="item.icon">
            <NIcon v-if="typeof item.icon === 'string'" :icon="item.icon" />
            <component v-else :is="item.icon" />
          </template>
          {{ item.title }}
        </a-menu-item>
      </template>
      <!-- <template v-else>
        <sub-menu :menu-info="item" :key="item.key" />
      </template> -->
    </template>
  </a-sub-menu>
</template>

<script setup>
import { useRouter } from 'vue-router'

import { useDesign } from '../../hooks/useDesign'
// import { ASubMenu, AMenuItem } from 'ant-design-vue'
// import NIcon from '../NIcon/NIcon.vue'
const { prefixCls } = useDesign('sub-menu')
defineOptions({
  name: 'NSubMenu'
})
const router = useRouter()
defineProps({
  menuInfo: {
    type: Object,
    default: () => ({})
  }
})
const handleRoute = (item) => {
  console.log('iteem', item)
  router.push({
    name: item.name
  })
}
</script>

<style></style>
