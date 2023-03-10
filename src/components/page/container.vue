<template>
  <main class="page-container">
    <header v-if="$slots.header" class="page-header" :class="headerClassName">
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
    <footer v-if="$slots.footer" class="page-footer" :class="footerClass">
      <slot name="footer"></slot>
    </footer>
  </main>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, useSlots } from 'vue'
import { pxToVw } from '@/utils/util'
const slots = useSlots()
const props = defineProps({
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
  },
  headerHeight: {
    type: Number,
    default: 88
  },
  footerHeight: {
    type: Number,
    default: 0
  }
})
const isSticky = ref(false)
const contentStyle = computed(() => {
  let str = ''
  if (props.fullscreen) {
    if (slots.header && props.headerHeight) {
      str += getFullStyle(props.headerHeight, 'top')
    }
    if (slots.footer && props.footerHeight) {
      str += getFullStyle(props.footerHeight, 'bottom')
    }
  }
  return str
})
const headerClassName = computed(() => {
  let str = props.headerClass || ''
  if (props.fullscreen && props.headerHeight && !isSticky.value) {
    str += ' custom-page-header'
  }
  return str
})
function getFullStyle(num: string | number, type: 'top' | 'bottom') {
  let str = ''
  const p = `padding-${type}`
  const m = `margin-${type}`
  const s = `safe-area-inset-${type}`
  const val = pxToVw(num)
  str += `${p}:${val};`
  str += `${p}:calc(${val} + constant(${s}));`
  str += `${p}:calc(${val} + env(${s}));`
  str += `${m}:-${val};`
  str += `${m}:calc(-${val} - constant(${s}));`
  str += `${m}:calc(-${val} - env(${s}));`
  return str
}
function handleScroll(event: any) {
  if (props.fullscreen && props.headerHeight) {
    isSticky.value =
      event.target.scrollTop > (props.headerHeight / 750) * window.innerWidth
  }
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
  /deep/ .custom-nav {
    .title,
    .back {
      color: #fff;
    }
  }
}
</style>
