<template>
  <Icon icon="mdi:account-arrow-right" />
  <a-sub-menu :key="menuInfo.key">
    <template #icon v-if="menuInfo.icon">
      <component :is="menuInfo.icon" />
    </template>
    <template #title>{{ menuInfo.title }}</template>
    <template v-for="item in menuInfo.children" :key="item.key">
      <template v-if="!item.children">
        <a-menu-item :key="item.key" @click="handleRoute(item)">
          <template #icon v-if="item.icon">
            <component :is="item.icon" />
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
import { computed } from 'vue'
import Icon from '@ant-design/icons-vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const props = defineProps({
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
