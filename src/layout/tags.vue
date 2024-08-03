<template>
  <div class="flex center between tags-box pt10 pr10">
    <div class="icon-box" @click.stop="handleArrow('left')">
      <arrow-left-outlined />
    </div>
    <div class="flex flex-items-center tags" ref="tagsboxRef">
      <div
        class="tags-ul"
        ref="tagsScrollRef"
        :style="{ width: (openRouteList.length - 1) * 110 + 116 + 'px' }"
      >
        <div
          v-for="(item, index) in openRouteList"
          :key="item.name"
          :class="['tag', currentRouteName === item.name && 'active']"
          @click.stop="changeTag(item)"
          :style="{ left: index * 110 + 'px' }"
        >
          <a-dropdown class="flex-1" :trigger="['contextmenu']" placement="bottomLeft">
            <div relative>
              <div class="tag-content line-clamp-1">{{ t(`menu.${item.meta.key}`) }}</div>
              <div class="icon-bg">
                <svg
                  t="1665666821541"
                  class="icon"
                  viewBox="0 0 3712 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3906"
                  width="116px"
                  height="48px"
                >
                  <path
                    d="M3712 1024H0L148.224 207.008A240.544 240.544 0 0 1 377.216 0h2957.568a240.544 240.544 0 0 1 229.024 207.008z"
                    p-id="3907"
                  ></path>
                </svg>
              </div>
              <div @click.stop="removeTag(item.name)" class="close" v-if="item.name !== 'analysis'">
                <close-circle-filled />
              </div>
            </div>
            <template #overlay>
              <a-menu @click="(val) => handleClickDropdown(val, item.name)">
                <a-menu-item v-if="item.name !== 'analysis'" key="1">关闭</a-menu-item>
                <a-menu-item key="2">关闭其他</a-menu-item>
                <a-menu-item key="3">关闭所有标签</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>
    <div class="flex center icon-group">
      <div class="icon-box" @click.stop="handleArrow('right')">
        <arrow-right-outlined />
      </div>
      <div class="icon-box" @click.stop="changeMore">
        <menu-outlined />
      </div>
    </div>
    <alltags @clear="clear" @remove="removeTag" v-if="showAllModal" @changeTag="changeTag" />
  </div>
</template>
<script setup>
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseCircleFilled,
  MenuOutlined
} from '@ant-design/icons-vue'
import { useDebounceFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import useStore from 'store'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import Alltags from './alltags.vue'
defineOptions({
  name: 'TagsIndex'
})
const { user } = useStore()
const { t } = useI18n()
const { openRouteList, currentRouteName } = storeToRefs(user)
const router = useRouter()
// const offsetLeft = ref(0)
const tagsboxRef = ref(null)
const tagsScrollRef = ref(null)
const showAllModal = ref(false)
// const defaultHome = {
//   title: t['dashboard:analysis'] || '分析页',
//   path: 'analysis',
//   name: 'analysis',
//   params: {},
//   query: {},
//   meta: {
//     key: 'dashboard:analysis'
//   }
// }
// const list = computed(() => {
//   console.log('路由', openRouteList)
//   return openRouteList ?? [defaultHome]
// })
/**
 * @description 切换路由
 */
const changeTag = useDebounceFn((item) => {
  if (currentRouteName.value === item.name) return
  router.push({
    path: item.path,
    query: item.query || {},
    params: item.params || {}
  })
  currentRouteName.value = item.name
  // user.updateRouteName(item.name)
  sizeInit()
}, 300)

/**
 * @description 删除tag
 */
console.log('openRouteList', openRouteList, currentRouteName.value)

const removeTag = (name, isOther = false) => {
  let current = 0
  openRouteList.value = openRouteList.value.filter((item, index) => {
    if (item.name === name) {
      current = isOther ? index : index - 1
    }
    return isOther ? item.name === name || item.name === 'analysis' : item.name !== name
  })
  // const current = user.updateOpenRouteList(name)
  // console.log('current', current)
  const currentItem = openRouteList.value[current]
  if (!currentItem) return
  router.push({
    path: currentItem.path,
    query: currentItem.query || {},
    params: currentItem.params || {},
    meta: currentItem.meta || {}
  })
  currentRouteName.value = currentItem.name
  // // user.updateRouteName(currentItem.name)
  sizeInit()
}

/**
 * @description sizeInit
 */
const sizeInit = () => {
  const allWidth = tagsboxRef.value.offsetWidth
  const index = openRouteList.value.findIndex((item) => item.name === currentRouteName)
  const activeTagWidth = index * 110 + 116
  if (allWidth < activeTagWidth) {
    const left = allWidth - activeTagWidth
    tagsScrollRef.value.style.left = left + 'px'
  } else {
    tagsScrollRef.value.style.left = '0px'
  }
}
/**
 * @description handleArrow
 */
const handleArrow = (type) => {
  const allWidth = tagsboxRef.value.offsetWidth
  if (type === 'left') {
    tagsScrollRef.value.style.left = '0px'
  } else {
    const width = (openRouteList.value.length - 1) * 110 + 116
    const left = allWidth - width
    console.log('电机有', left)
    if (allWidth < width) {
      tagsScrollRef.value.style.left = left + 'px'
    }
  }
}
const changeMore = () => {
  showAllModal.value = !showAllModal.value
  const handle = () => {
    showAllModal.value = false
    window.removeEventListener('click', handle)
  }
  window.addEventListener('click', handle)
}
/**
 * @description 清除所有
 */
const clear = () => {
  console.log('清除所有')
  // openRouteList.value = [defaultHome]
  user.clearAllTag()
  router.push({
    name: 'analysis'
  })
  // currentRouteName.value = 'analysis'
  tagsScrollRef.value.style.left = '0px'
  changeMore()
}

/**
 * @description 处理下拉标签
 * @param {Object} item 当前数据
 * @param {String} key 1:关闭,2:关闭其他,3:关闭所有标签
 */
const handleClickDropdown = ({ key }, name) => {
  const tmp = {
    1: () => removeTag(name),
    2: () => removeTag(name, true),
    3: () => clear()
  }
  tmp[key]()
}
</script>
<style lang="less" scoped>
/*
 * @Author: 聂芳
 * @Date: 2022-07-09 11:31:28
 * @Last Modified by: 聂芳
 * @Last Modified time: 2022-07-11 15:38:26
 * @Description: 菜单tags
 */
.tags-box {
  .icon-group {
    margin-left: 10px;
    flex-shrink: 0;
    position: relative;
    border-radius: 4px 4px 0px 0px;
    &:hover {
      background-color: var(--white);
    }
    &:before {
      content: '';
      height: 16px;
      width: 1px;
      position: absolute;
      left: 32px;
      top: 8px;

      background: #dfe2e5;
    }
  }
  .icon-box {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    line-height: 32px;
    color: #d1d2d3;
    transition: all 0.5s;
    cursor: pointer;
    text-align: center;
    &:hover {
      color: var(--h-switch-svg-light);
      font-weight: bold;
    }
  }
  .tags {
    flex: 1;
    overflow: hidden;
    .tags-ul {
      position: relative;
      height: 32px;
      transition: all 0.35s ease-in;
      .tag {
        position: absolute;
      }
    }
    .tag {
      display: flex;
      width: 116px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      z-index: 1;
      cursor: pointer;
      &.active {
        z-index: 2;
        .tag-content {
          color: var(--nav-color);
        }
        .icon-bg {
          color: var(--h-switch-c-bg-light);
          .icon {
            fill: var(--h-switch-c-bg-light);
          }
        }
      }
      .tag-content {
        position: relative;
        z-index: 2;
        width: 100%;
        padding: 0 20px;
        height: 32px;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
        text-align: center;
        color: var(--h-tag-color-secondary);
        font-size: 12px;
      }
      .icon-bg {
        left: 0;
        top: 0;
        position: absolute;
        font-size: 32px;
        color: var(--h-tag-color-secondary);
        width: 116px;
        height: 48px;
        .icon {
          width: 116px;
          // height: 48px;
          fill: var(--h-tag-bg-secondary);
          margin-top: -8px;
        }
      }
      .close {
        width: 20px;
        height: 20px;
        line-height: 20px;
        position: absolute;
        top: 50%;
        right: 5px;
        margin-top: -10px;
        z-index: 2;
        color: #cccccc;
        transition: all 0.5s;
        transform: rotate(0deg);
        transform-origin: 10px 10px;
        cursor: pointer;
        text-align: center;
        &:hover {
          color: var(--h-switch-svg-light);
          transform: rotate(90deg);
          font-weight: bold;
        }
      }
    }
  }
}
.dark .tags-box {
  .icon-group {
    &:hover {
      background-color: var(--h-switch-c-bg-light);
    }
  }
}
</style>
