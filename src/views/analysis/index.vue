<template>
  <view>数据看板</view>
  <a-button type="primary">Primary</a-button>
  <a-button>Default</a-button>
  <a-button type="dashed">Dashed</a-button>
  <a-button type="primary">Danger</a-button>
  <a-range-picker v-model:value="value1" />
</template>

<script setup>
import { ref } from 'vue'
const value1 = ref()
</script>

<style></style>
