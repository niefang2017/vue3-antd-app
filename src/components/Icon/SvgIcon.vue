<template>
  <svg
    :class="[prefixCls, $attrs.class, spin && 'animate-spin']"
    :style="getStyle"
    aria-hidden="true"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>
<script setup>
import { computed } from 'vue'

import { useDesign } from '@/hooks/useDesign'

defineOptions({ name: 'SvgIcon' })

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 16
  },
  spin: {
    type: Boolean,
    default: false
  }
})

const { prefixCls } = useDesign('svg-icon')
const symbolId = computed(() => `#${props.prefix}-${props.name}`)

const getStyle = computed(() => {
  const { size } = props
  let s = `${size}`
  s = `${s.replace('px', '')}px`
  return {
    width: s,
    height: s
  }
})
</script>
<style scoped></style>
