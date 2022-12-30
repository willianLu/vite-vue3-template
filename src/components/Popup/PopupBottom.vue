<template>
  <van-popup
    :show="show"
    position="bottom"
    round
    :style="popupStyle"
    @close="handlePopupClose"
    @open="handlePopupOpen"
  >
    <div
      ref="container"
      class="popup-bottom-container"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <div :class="['popup-bottom-bar', { untouch: !isSupporTouch }]"></div>
      <h1 class="popup-bottom-title">底部弹窗</h1>
      <div :class="['popup-scroll-container', { untouch: !isSupporTouch }]">
        <div ref="content" :style="contentStyle">
          <slot></slot>
        </div>
      </div>
    </div>
  </van-popup>
</template>
<script setup lang="ts">
import {
  ref,
  computed,
  reactive,
  defineProps,
  defineEmits,
  nextTick
} from 'vue'
defineProps({
  show: Boolean
})
const emits = defineEmits(['update:show'])
const DocumentTouch = (window as any).DocumentTouch
const isSupporTouch =
  'ontouchstart' in window ||
  (DocumentTouch && document instanceof DocumentTouch)
// 弹窗容器 ref
const container = ref<HTMLDivElement | null>(null)
// 弹窗内部-内容区域(可滚动部分) ref
const content = ref<HTMLDivElement | null>(null)
// 参照数据
const refer = reactive({
  y: 0, // 手指滑动y位置
  top: 0, // 容器的滑动top值
  cTop: 0, // 容器内容区域滑动top值
  isScrolContent: false, // 是否是内容区域滚动
  timestamp: 0, // 参考时间戳
  ocTop: 0, // 上一次内容区域的top值
  isEnd: false // 滑动是否结束
})
// 弹窗的style样式，滑动位置css值
const popupStyle = computed(() => {
  return isSupporTouch ? transformStyle(refer.top, refer.isEnd) : ''
})
// 弹窗内容区域的style样式，滑动位置css值
const contentStyle = computed(() => {
  return isSupporTouch ? transformStyle(refer.cTop, refer.isEnd) : ''
})
// 样式值公共方法
function transformStyle(top: number, end: boolean) {
  return `transform: translateX(0px) translateY(${top}px) translateZ(1px); transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1); transition-property: transform; transition-duration: ${
    end ? 300 : 0
  }ms;`
}
// 内容区域可滚动的scroll height值
const scrollHeight = computed(() => {
  const height = content.value?.clientHeight || 0
  const pHeight = content.value?.parentElement?.clientHeight || 0
  return height - pHeight
})
// 处理touchstart事件
function handleTouchStart(event: TouchEvent) {
  // 不支持touch时return，与页面设置保持统一
  if (!isSupporTouch) return
  refer.y = event.touches[0].pageY
  refer.timestamp = getTimestamp()
  refer.ocTop = refer.cTop
  refer.isScrolContent = judgeScrollBox(event.target as Element)
}
// 处理touchmove事件
function handleTouchMove(event: TouchEvent) {
  // 不支持touch时return，与页面设置保持统一
  if (!isSupporTouch) return
  event.preventDefault()
  const y = event.touches[0].pageY
  // 滑动距离
  const distance = y - refer.y
  // 是否向下滑动
  const isDown = distance > 0
  // 是否可以操作主的容器，默认可操作
  let isOperateMain = true
  // 在内容区域滑动时
  if (refer.isScrolContent && refer.top === 0) {
    // 在内容区域滑动时，向下滑动且内容区域已滑动到顶部时，方可操作主容器
    isOperateMain = isDown && refer.cTop === 0
    let cTop = refer.cTop + distance
    // 当滑动到超出顶部时，停留在顶部0的位置
    if (cTop > 0) {
      cTop = 0
    } else if (scrollHeight.value > 0 && cTop < -scrollHeight.value) {
      // 当可滑动距离大于0时，滑动的距离超出可滑动区域时，减慢滑动速度，实现滑动到底费力拉动的效果
      cTop = refer.cTop + distance * 0.2
    }
    refer.cTop = cTop
  }
  if (isOperateMain) {
    // 可操作主的容器时，设置容器的滑动距离
    const top = refer.top + distance
    refer.top = top < 0 ? 0 : top
  }
  refer.y = y
}
// 判断是否在滑动内容内
function judgeScrollBox(target: Element): boolean {
  if (target.className === 'popup-scroll-container') {
    return true
  } else if (target.className === 'popup-bottom-container') {
    return false
  }
  if (target.parentElement) {
    return judgeScrollBox(target.parentElement)
  }
  return false
}
// 处理touchend事件
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
  // 滑动结束，不符合关闭的弹窗的条件
  // 将容器的滑动位置还原到初始值
  refer.top = 0
  refer.y = 0
  refer.isEnd = true
  const duration = getTimestamp() - refer.timestamp
  // 当滑动的时内容区域时，判断快速滑动的情况(滑动时间小于500毫秒)
  if (refer.isScrolContent && duration < 500) {
    // 原始top值 + 移动距离 * 一个系数，做快速滚动的效果
    const distance =
      refer.ocTop +
      (refer.cTop - refer.ocTop) * (1 + ((600 - duration) / 100) * 0.5)
    refer.cTop = distance > 0 ? 0 : distance
  }
  // 当滑动到底部超出可滚动范围时，执行回弹效果
  if (refer.cTop < -scrollHeight.value) {
    refer.cTop = -scrollHeight.value
  }
}
// 获取时间戳
function getTimestamp() {
  return new Date().getTime()
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
    refer.cTop = 0
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
.popup-bottom-bar {
  padding: 16px 0 24px;
  &::before {
    content: '';
    display: block;
    margin: 0 auto;
    width: 68px;
    height: 8px;
    border-radius: 4px;
    background-color: #ddd;
  }
  &.untouch {
    padding: 16rpx 0;
  }
  &.untouch::before {
    height: 0;
  }
}
.popup-bottom-title {
  margin-bottom: 32px;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
}
.popup-scroll-container {
  min-height: 168px;
  max-height: calc(100vh - 368px);
  scroll-behavior: none;
  overflow: hidden;
  &.untouch > div {
    max-height: calc(100vh - 368px);
    overflow: auto;
  }
}
</style>
