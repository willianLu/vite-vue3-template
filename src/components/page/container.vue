<template>
  <div class="qt-page">
    <div v-if="$slots.header" ref="header">
      <div class="qt-page__header">
        <slot name="header"></slot>
      </div>
    </div>
    <div
      ref="content"
      class="qt-page__content"
      :style="contentStyle"
      @scroll="handleScroll"
    >
      <div
        v-if="fullScreen && inViewport"
        ref="viewport"
        class="qt-page__viewport"
      ></div>
      <slot></slot>
    </div>
    <div v-if="$slots.footer" ref="footer">
      <div class="qt-page__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, useSlots, watch, nextTick } from 'vue'
import { useWindowSize } from '@vant/use'
const props = defineProps({
  fullScreen: {
    type: Boolean,
    default: false
  },
  inViewport: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['scroll', 'inViewportAction'])

const slots = useSlots()
const contentStyle = ref({})
const { width } = useWindowSize()
const header = ref<HTMLElement>()
const footer = ref<HTMLElement>()
const content = ref<HTMLElement>()
const viewport = ref<HTMLElement>()
const isInViewport = ref(true)

defineExpose({
  content
})
watch(
  () => [width.value],
  () => {
    handleFullScreen()
  }
)
onMounted(() => {
  handleFullScreen()
})
function handleFullScreen() {
  if (!props.fullScreen) return
  nextTick(() => {
    const styleObj = {
      '--offset-top': '0px',
      '--offset-bottom': '0px'
    }
    if (slots.header && header.value) {
      styleObj['--offset-top'] = header.value.clientHeight + 'px'
    }
    if (slots.footer && footer.value) {
      styleObj['--offset-bottom'] = footer.value.clientHeight + 'px'
    }
    contentStyle.value = styleObj
  })
}
function handleScroll(event: Event) {
  emits('scroll', event)
  // 判断设定元素是否在可视区域内
  if (props.inViewport && viewport.value) {
    const target = event.target as HTMLElement
    const __isInViewport = target.scrollTop <= viewport.value.offsetTop
    if (isInViewport.value !== __isInViewport) {
      isInViewport.value = __isInViewport
      emits('inViewportAction', isInViewport.value)
    }
  }
}
</script>
<style lang="less" scoped>
.qt-page {
  --offet-top: 0;
  --offet-bottom: 0;
  --qt-page-background-color: #f4f6f8;
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--qt-page-background-color);
  overflow: hidden;
  &__header,
  &__footer {
    position: relative;
    z-index: 90;
  }
  &__content {
    position: relative;
    margin-top: calc(var(--offset-top) * -1);
    margin-bottom: calc(var(--offset-bottom) * -1);
    padding-top: calc(var(--offset-top));
    padding-bottom: calc(var(--offset-bottom));
    flex: 1;
    box-sizing: border-box;
    overflow-y: auto;
    overscroll-behavior: none;
  }
  &__viewport {
    position: absolute;
    top: var(--offset-top);
    left: 0;
    width: 100%;
    height: 1px;
  }
}
</style>
