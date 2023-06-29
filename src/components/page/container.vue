<template>
  <main class="page-container">
    <header
      v-if="$slots.header"
      ref="header"
      class="page-header"
      :class="headerClassName"
    >
      <slot name="header"></slot>
    </header>
    <section class="page-content" :style="contentStyle" @scroll="handleScroll">
      <div
        class="page-content-wrap"
        :class="contentClass"
        :style="contentStyle"
      >
        <slot></slot>
      </div>
    </section>
    <footer
      v-if="$slots.footer"
      ref="footer"
      class="page-footer"
      :class="footerClass"
    >
      <slot name="footer"></slot>
    </footer>
  </main>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import Config from '@/config'
const props = defineProps({
  // 是否全屏显示
  fullscreen: Boolean,
  headerClass: {
    type: String,
    default: ''
  },
  footerClass: {
    type: String,
    default: ''
  },
  contentClass: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['scroll'])
const header = ref<HTMLElement>()
const footer = ref<HTMLElement>()
// 全屏状态下，是否自动吸顶
const isSticky = ref(false)
// 全屏状态下，内容框样式设置
const contentStyle = computed(() => {
  if (!props.fullscreen) return ''
  let str = ''
  if (header.value) {
    str += getFullStyle(header.value.clientHeight, 'top')
  }
  if (footer.value) {
    str += getFullStyle(footer.value.clientHeight, 'bottom')
  }
  return str
})
// 设置头部自定义class
const headerClassName = computed(() => {
  let str = props.headerClass || ''
  if (
    props.fullscreen &&
    header.value &&
    header.value.clientHeight &&
    !isSticky.value
  ) {
    str += ' custom-page-header'
  }
  return str
})
function getFullStyle(num: number, type: 'top' | 'bottom') {
  let str = ''
  const p = `padding-${type}`
  const m = `margin-${type}`
  const val = num + 'px'
  str += `${p}:${val};`
  str += `${m}:-${val};`
  return str
}
function handleScroll(event: any) {
  // 全屏状态下，设置吸顶
  if (props.fullscreen && header.value && header.value.clientHeight) {
    isSticky.value =
      event.target.scrollTop >
      (header.value.clientHeight / Config.viewportWidth) * window.innerWidth
  }
  emits('scroll', event)
}
</script>
<style lang="less" scoped>
.page-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f7f8fb;
  overflow: hidden;
}
.page-header {
  flex-shrink: 0;
  z-index: 1;
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
  background-color: #fff;
  border-bottom: 1px solid #eeeff1;
}
.page-content {
  position: relative;
  z-index: 0;
  flex: 1;
  box-sizing: content-box;
  overflow-y: auto;
}
.page-content-wrap {
  min-height: 100%;
  box-sizing: content-box;
  overflow: hidden;
}
.page-footer {
  z-index: 1;
  flex-shrink: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  background-color: #fff;
  border-top: 1px solid #eeeff1;
}
.custom-page-header {
  background-color: transparent;
  border-color: transparent;
  :deep(.van-nav-bar) {
    --van-nav-bar-title-text-color: #fff;
    --van-nav-bar-icon-color: #fff;
  }
}
</style>
