<template>
  <van-popup
    position="bottom"
    round
    :style="popupStyle"
    @open="handlePopupOpen"
    @click-overlay="handleClickOverlay"
  >
    <section
      ref="container"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @touchcancel="handleTouchEnd"
    >
      <div class="popup-bar" :class="{ untouch: !isSupporTouch }"></div>
      <h1 class="popup-bottom-title">{{ title }}</h1>
      <div ref="content" class="popup-scroll-container">
        <slot></slot>
      </div>
    </section>
  </van-popup>
</template>
<script setup lang="ts">
import { reactive, ref, computed, unref, nextTick } from 'vue'
// 是否支持滑动
const isSupporTouch =
  'ontouchstart' in window ||
  ((window as any).DocumentTouch &&
    document instanceof (window as any).DocumentTouch)
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  }
})
const emits = defineEmits(['update:show'])
const container = ref()
const content = ref()
const refer = reactive({
  y: 0,
  contentScrollTop: 0,
  isContent: false,
  top: 0,
  isEnd: false,
  direction: ''
})

// 弹窗的style样式，滑动位置css值
const popupStyle = computed(() => {
  return isSupporTouch ? transformStyle(refer.top, refer.isEnd) : ''
})

// 样式值公共方法
function transformStyle(top: number, isEnd: boolean) {
  return `transform: translateX(0px) translateY(${top}px) translateZ(1px); transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1); transition-property: transform; transition-duration: ${
    isEnd ? 300 : 0
  }ms;`
}
function handleTouchStart(event: TouchEvent) {
  // 不支持touch时return，与页面设置保持统一
  if (!isSupporTouch) return
  refer.y = event.touches[0].pageY
  refer.isContent = judgeScrollBox(event.target)
  refer.contentScrollTop = content.value.scrollTop
  refer.direction = ''
}
function handleTouchMove(event: TouchEvent) {
  // 不支持touch时return，与页面设置保持统一
  if (!isSupporTouch) return
  const y = event.touches[0].pageY
  // 滑动距离
  const distance = y - refer.y
  // 确定首次滑动方向
  if (!refer.direction) {
    refer.direction = distance > 0 ? 'down' : 'up'
  }
  const isScroll =
    !refer.isContent ||
    (refer.contentScrollTop === 0 &&
      content.value.scrollTop === 0 &&
      refer.direction === 'down')
  if (isScroll) {
    refer.top = distance < 0 ? 0 : distance
  }
}
function handleTouchEnd() {
  // 不支持touch时return，与页面设置保持统一
  if (!isSupporTouch) return
  // 当容易向底部滑动到大于1/4的高度时，关闭弹窗
  const height = container.value?.clientHeight
  if (height && refer.top >= height / 4) {
    refer.top = height + 50
    handlePopupClose()
    return
  }
  refer.top = 0
  refer.y = 0
  refer.isEnd = true
}
// 判断是否在滑动内容内
function judgeScrollBox(target: EventTarget | null) {
  const element = unref(content)
  return !!(element && element.contains(target))
}
// 点击黑色蒙层
function handleClickOverlay() {
  if (props.closeOnClickOverlay) {
    handlePopupClose()
  }
}
// 关闭弹窗
function handlePopupClose() {
  emits('update:show', false)
}
/**
 * 弹窗打开时，初始化滚动位置
 */
function handlePopupOpen() {
  // 移动端
  if (isSupporTouch) {
    refer.y = 0
    refer.top = 0
  } else {
    // pc端
    nextTick(() => {
      const el = content.value
      el && el.scrollTo(0, 0)
    })
  }
}
</script>
<style lang="less" scoped>
.popup-bar {
  padding-top: 16px;
  &::before {
    content: '';
    display: block;
    margin: 0 auto;
    width: 68px;
    height: 8px;
    border-radius: 4px;
    background-color: #ddd;
  }
  &.untouch::before {
    height: 0;
  }
}
.popup-bottom-title {
  padding: 24px 0 26px;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
}
.popup-scroll-container {
  min-height: 168px;
  max-height: 68vh;
  scroll-behavior: none;
  overflow: auto;
}
</style>
