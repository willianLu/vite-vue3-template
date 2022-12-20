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
      <div class="popup-bottom-bar"></div>
      <h1 class="popup-bottom-title">底部弹窗</h1>
      <div class="popup-scroll-container">
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
const container = ref<HTMLDivElement | null>(null)
const content = ref<HTMLDivElement | null>(null)
// 弹层滑动位置
const position = reactive({
  y: 0,
  top: 0,
  cTop: 0,
  isScrollBox: false,
  timestamp: 0,
  ocTop: 0
})
const isEnd = ref(false)
const popupStyle = computed(() => {
  return transformStyle(position.top, isEnd.value)
})
const contentStyle = computed(() => {
  return transformStyle(position.cTop, isEnd.value)
})

function transformStyle(top: number, end: boolean) {
  return `transform: translateX(0px) translateY(${top}px) translateZ(1px); transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1); transition-property: transform; transition-duration: ${
    end ? 300 : 0
  }ms;`
}
const scrollHeight = computed(() => {
  const height = content.value?.clientHeight || 0
  const pHeight = content.value?.parentElement?.clientHeight || 0
  return height - pHeight
})
function handleTouchStart(event: TouchEvent) {
  position.y = event.touches[0].pageY
  position.timestamp = getTimestamp()
  position.ocTop = position.cTop
  position.isScrollBox = judgeScrollBox(event.target as Element)
}
function handleTouchMove(event: TouchEvent) {
  event.preventDefault()
  const y = event.touches[0].pageY
  const distance = y - position.y
  const isDown = distance > 0
  let isOperateMain = true
  if (position.isScrollBox && position.top === 0) {
    const cTop = position.cTop + distance
    isOperateMain = isDown && position.cTop === 0
    position.cTop =
      cTop > 0
        ? 0
        : scrollHeight.value > 0 && cTop < -scrollHeight.value
        ? position.cTop + distance * 0.2
        : cTop
  }
  if (isOperateMain) {
    const top = position.top + distance
    position.top = top < 0 ? 0 : top
  }
  position.y = y
}
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
function handleTouchEnd() {
  position.top = 0
  position.y = 0
  isEnd.value = true
  const duration = getTimestamp() - position.timestamp
  if (position.isScrollBox && duration < 500) {
    const distance =
      position.ocTop +
      (position.cTop - position.ocTop) * (1 + ((600 - duration) / 100) * 0.5)
    position.cTop = distance > 0 ? 0 : distance
  }
  if (position.cTop < -scrollHeight.value) {
    position.cTop = -scrollHeight.value
  }
}

function getTimestamp() {
  return new Date().getTime()
}

function handlePopupClose() {
  emits('update:show', false)
}
function handlePopupOpen() {
  position.y = 0
  position.top = 0
  // const box = content.value
  // if (box && box.scrollTo) {
  //   box.scrollTo()
  // }
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
}
</style>
