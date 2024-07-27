<template>
  <a-input
    :style="{ width }"
    placeholder="请输入搜索icon"
    :class="prefixCls"
    v-model:value="currentSelect"
    @click="triggerPopover"
    :allowClear="props.allowClear"
    :readonly="props.readonly"
  >
    <template #addonAfter>
      <a-popover
        placement="bottomLeft"
        trigger="click"
        v-model:open="show"
        :overlayClassName="`${prefixCls}-popover`"
      >
        <template #title>
          <div class="flex justify-between">
            <a-input placeholder="请搜索" @change="debounceHandleSearchChange" allowClear />
          </div>
        </template>

        <template #content>
          <div v-if="getPaginationList.length">
            <!-- scroll -->
            <div class="scrollbar" overflow-y-auto>
              <div class="border border-solid border-t-0">
                <ul class="flex flex-wrap px-2">
                  <li
                    v-for="icon in getPaginationList"
                    :key="icon"
                    :class="currentSelect === icon ? 'border border-primary' : ''"
                    class="p-2 w-[calc(12.5%-1px)] cursor-pointer mr-1 mt-1 flex justify-center items-center border border-solid hover:border-primary"
                    @click="handleClick(icon)"
                    :title="icon"
                  >
                    <SvgIcon v-if="isSvgMode" :name="icon" />
                    <Icon :icon="icon" v-else />
                  </li>
                </ul>
              </div>
            </div>
            <div class="flex py-2 items-center justify-center" v-if="getTotal >= pageSize">
              <a-pagination
                showLessItems
                size="small"
                :pageSize="pageSize"
                :total="getTotal"
                @change="handlePageChange"
              />
            </div>
          </div>
          <template v-else>
            <div class="p-5"><a-empty /></div>
          </template>
        </template>

        <div ref="trigger">
          <span
            class="cursor-pointer px-2 py-1 flex items-center"
            v-if="isSvgMode && currentSelect"
          >
            <SvgIcon :name="currentSelect" />
          </span>
          <Icon
            :icon="currentSelect || 'ion:apps-outline'"
            class="cursor-pointer px-2 py-1"
            v-else
          />
        </div>
      </a-popover>
    </template>
  </a-input>
  <context-holder />
</template>
<script setup>
import { useDebounceFn } from '@vueuse/core'
import { message } from 'ant-design-vue'
import { setClipboardData } from 'utils/tool'
import svgIcons from 'virtual:svg-icons-names'
import { ref, watch, watchEffect } from 'vue'

import { useDesign } from '@/hooks/useDesign'
import { usePagination } from '@/hooks/usePagination'

import iconsData from './icons.data'
import Icon from './index.vue'
import SvgIcon from './SvgIcon.vue'
const [messageApi, contextHolder] = message.useMessage()
defineOptions({
  inheritAttrs: false,
  name: 'IconPicker'
})
function getIcons() {
  const prefix = iconsData.prefix
  return iconsData.icons.map((icon) => `${prefix}:${icon}`)
}

function getSvgIcons() {
  return svgIcons.map((icon) => icon.replace('icon-', ''))
}
const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '100%'
  },
  pageSize: {
    type: Number,
    default: 160
  },
  copy: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    default: 'iconify'
  },
  allowClear: {
    type: Boolean,
    default: true
  },
  readonly: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['change', 'update:value'])

const isSvgMode = props.mode === 'svg'
const icons = isSvgMode ? getSvgIcons() : getIcons()
const currentSelect = ref('')
const show = ref(false)
const currentList = ref(icons)
const trigger = ref()

const triggerPopover = () => {
  if (trigger.value) {
    trigger.value.click()
  }
}

const { prefixCls } = useDesign('icon-picker')

const debounceHandleSearchChange = useDebounceFn(handleSearchChange, 100)

const { getPaginationList, getTotal, setCurrentPage } = usePagination(currentList, props.pageSize)
watchEffect(() => {
  currentSelect.value = props.value
})
watch(
  () => currentSelect.value,
  (v) => {
    emit('update:value', v)
    emit('change', v)
  }
)
async function handlePageChange(page) {
  setCurrentPage(page)
}
const handleClick = async (icon) => {
  currentSelect.value = icon
  if (props.copy) {
    await setClipboardData(icon)
    messageApi.success('复制成功!')
  }
  show.value = false
}

function handleSearchChange(e) {
  const value = e.target.value

  if (!value) {
    setCurrentPage(1)
    currentList.value = icons
    return
  }
  currentList.value = icons.filter((item) => item.includes(value))
}
</script>
<style>
.jxy-icon-picker-popover .ant-input-group-addon {
  padding: 0;
}

.jxy-icon-picker-popover .ant-input {
  cursor: pointer;
}
.jxy-icon-picker-popover {
  width: 300px;
}
.jxy-icon-picker-popover .ant-popover-inner-content {
  padding: 0;
}
.jxy-icon-picker-popover .scrollbar {
  height: 220px;
}
</style>
