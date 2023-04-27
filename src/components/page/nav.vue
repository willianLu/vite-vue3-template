<template>
  <nav class="page-nav">
    <div class="left flex-v-center">
      <SvgIcon
        v-if="!isCoseBack"
        class="back"
        name="left"
        @click="goBack"
      ></SvgIcon>
      <slot name="left"></slot>
    </div>
    <div class="title flex-center">{{ title }}</div>
    <div class="right flex-v-center">
      <slot name="right"></slot>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { defineProps, computed } from 'vue'
import SvgIcon from '../svg-icon.vue'
import { useRouter } from 'vue-router'
import { isDef } from '@/utils/util'
const props = defineProps<{
  title?: string
  closeBack?: boolean
}>()
const router = useRouter()
const isCoseBack = computed(() => {
  if (props.closeBack) return true
  const { state } = window.history
  return !(state && isDef(state.back))
})
function goBack() {
  router.back()
}
</script>
<style lang="less" scoped>
.page-nav {
  position: relative;
  height: 80px;
  .back {
    padding: 24px 12px;
    font-size: 32px;
    color: #000;
    cursor: pointer;
  }
  .title {
    margin: 0 auto;
    max-width: 60%;
    height: 80px;
    font-size: 32px;
    white-space: nowrap;
    overflow: hidden;
  }
  .left,
  .right {
    position: absolute;
    top: 0;
    height: 100%;
    font-size: 28px;
    color: #666;
  }
  .left {
    left: 0;
  }
  .right {
    right: 0;
  }
}
</style>
