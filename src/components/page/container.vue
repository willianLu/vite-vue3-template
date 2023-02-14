<!-- eslint-disable vue/require-default-prop -->
<template>
  <main
    class="page-container"
    :class="{ 'page-container-flex': !isFull, 'page-container-full': isFull }"
  >
    <header class="page-header" :style="{ backgroundColor: headerBgColor }">
      <slot name="header"></slot>
    </header>
    <section
      class="page-content"
      :class="contentClass"
      @scroll="$emit('scroll', $event)"
    >
      <slot></slot>
    </section>
    <footer class="page-footer" :style="{ backgroundColor: footerBgColor }">
      <slot name="footer"></slot>
    </footer>
  </main>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
defineProps({
  isFull: Boolean,
  headerBgColor: {
    type: String,
    default: '#fff'
  },
  footerBgColor: {
    type: String,
    default: '#fff'
  },
  contentClass: {
    type: String,
    default: ''
  }
})
defineEmits(['scroll'])
</script>
<style lang="less" scoped>
.page-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f7f8fb;
  overflow: hidden;
}
.page-container-flex {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .page-content {
    flex: 1;
  }
}
.page-container-full {
  .page-header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
  }
  .page-content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .page-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
  }
}
.page-header {
  flex-shrink: 0;
  padding-top: constant(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-top);
}
.page-content {
  position: relative;
  overflow-y: auto;
}
.page-footer {
  flex-shrink: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
