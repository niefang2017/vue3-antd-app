<template>
  <SvgIcon
    :size="size"
    :name="getSvgIcon"
    v-if="isSvgIcon"
    :class="[$attrs.class, 'anticon']"
    :spin="spin"
  />
  <span
    v-else
    ref="elRef"
    :class="[$attrs.class, 'app-iconify anticon', spin && 'app-iconify-spin']"
    :style="getWrapStyle"
  ></span>
</template>
<script setup>
import { renderSVG } from '@iconify/iconify'
import { computed, nextTick, onMounted, ref, unref, watch } from 'vue'
const SVG_END_WITH_FLAG = '|svg'
defineOptions({
  name: 'IconIndex'
})
const props = defineProps({
  size: {
    type: Number,
    default: 16
  },
  color: {
    type: String,
    default: 'text-dark'
  },
  icon: {
    type: String,
    default: ''
  },
  spin: {
    type: Boolean,
    default: false
  },
  prefix: {
    type: String,
    default: ''
  }
})

const elRef = ref()
const isSvgIcon = computed(() => props.icon?.endsWith(SVG_END_WITH_FLAG))
const getSvgIcon = computed(() => props.icon.replace(SVG_END_WITH_FLAG, ''))
const getIconRef = computed(() => `${props.prefix ? props.prefix + ':' : ''}${props.icon}`)
const getWrapStyle = computed(() => {
  return {
    color: props.color,
    fontSize: `${props.size}px`,
    display: 'inline-flex'
  }
})

const update = async () => {
  if (unref(isSvgIcon)) return
  const el = unref(elRef)
  if (!el) return
  await nextTick()
  const icon = unref(getIconRef)
  if (!icon) return
  const svg = renderSVG(props.icon)
  if (!svg) {
    const span = document.createElement('span')
    span.className = 'iconify'
    span.dataset.icon = props.icon
    el.textContent = ''
    el.appendChild(span)
  } else {
    el.textContent = ''
    el.appendChild(svg)
  }
}
watch(() => props.icon, update, { flush: 'post' })
onMounted(() => {
  update()
})
</script>
<style scoped></style>
