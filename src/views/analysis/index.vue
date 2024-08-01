<template>
  <section section-content>
    <div>数据看板</div>
    <i antd-down></i>
    <div class="i-logos-vue text-3xl" />
    无权限按钮控制:
    <div v-permission="'admin'">无权限</div>
    <div v-permission="'dashboard:analysis'">有权限按钮</div>

    <a-button type="primary">Primary</a-button>
    <a-button>Default</a-button>
    <a-button type="dashed">Dashed</a-button>
    <a-button type="primary">Danger</a-button>
    <a-range-picker v-model:value="value1" />
  </section>
</template>

<script setup>
defineOptions({
  name: 'DashboardAnalysis'
})
import { ref } from 'vue'
const value1 = ref()
</script>

<style></style>
