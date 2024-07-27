<template>
  <div class="all-tags">
    <div class="all-tags-content">
      <div class="all-tags-row" v-if="openRouteList.length">
        <div
          :class="['flex center between item']"
          :key="item.name"
          v-for="item in openRouteList"
          @click.stop="handleChangeTag(item)"
        >
          <div class="title">{{ item.title }}</div>
          <div class="close" v-if="item.name !== 'analysis'" @click.stop="handleRemove(item.name)">
            <close-circle-filled />
          </div>
        </div>
      </div>
      <div
        @click.stop="closeAll"
        :class="['close-all', openRouteList.length === 1 ? 'disabled' : '']"
      >
        <delete-outlined />
        关闭所有标签
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'AllTags'
})
import { CloseCircleFilled, DeleteOutlined } from '@ant-design/icons-vue'
import { useDebounceFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import useStore from 'store'
const { user } = useStore()
const { openRouteList } = storeToRefs(user)
const emits = defineEmits(['clear', 'remove', 'changeTag'])
const handleChangeTag = (item) => {
  if (!item || !item.name) return
  emits('changeTag', item)
}
const handleRemove = useDebounceFn((name) => {
  if (!name) return
  emits('remove', name)
}, 300)
/**
 * @description 清除
 */
const closeAll = useDebounceFn(() => {
  emits('clear')
}, 300)
</script>

<style lang="less" scoped>
.all-tags {
  position: absolute;
  right: 10px;
  top: 106px;
  z-index: 999999;
  width: 216px;
  &-content {
    width: 216px;
    height: 469px;
    overflow-x: hidden;
    overflow-y: auto;
    background: #fff;
    border-radius: 4px;
    box-shadow: var(--h-shadow-light);
    z-index: 99;
    position: relative;
    background-color: var(--h-switch-bg-light);
    .all-tags-row {
      height: 429px;
      width: 100%;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .item {
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
      position: relative;
      cursor: pointer;
      &:hover {
        background-color: var(--h-switch-c-bg-light);
        color: var(--h-switch-svg-light);
      }
      &:first-child {
        background-color: inherit;
        color: inherit;
      }
      &:last-child {
        &:after {
          content: none;
        }
      }
      &:after {
        position: absolute;
        bottom: 0px;
        content: '';
        display: inline-block;
        height: 1px;
        width: 100%;
        background: var(--bg-white);
        left: 0;
      }
      .title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .close {
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
    }
    .close-all {
      width: 100%;
      text-align: center;
      height: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
      &.disabled {
        pointer-events: none;
        cursor: not-allowed;
        opacity: 0.6;
      }
      &:not(.disabled) &:hover {
        color: var(--text-color);
      }
    }
  }
}
.theme-light {
  .all-tags {
    &-content {
      .item {
        color: var(--h-switch-br-h-light);
        &:hover {
          background-color: var(--bg-white);
        }
      }
    }
  }
}
.dark {
  .all-tags {
    &-content {
      box-shadow: var(--h-shadow-light);
      background-color: var(--h-switch-bg-light);
      .item {
        &:after {
          background: var(--h-switch-br-light);
        }
      }
    }
  }
}
</style>
