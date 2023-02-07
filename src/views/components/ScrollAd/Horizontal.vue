<template>
  <div ref="container" class="scroll-ad-container flex-v-center">
    <div
      class="scroll-add-box flex-v-center"
      :class="{ 'scroll-ad-animation': duration > 0 }"
      :style="boxStyle"
    >
      <ul ref="box" class="flex-v-center">
        <li v-for="(item, index) in list" :key="index">
          <SvgIcon name="trumpet" />{{ item }}
        </li>
      </ul>
      <ul v-if="duration > 0" class="flex-v-center">
        <li v-for="(item, index) in list" :key="index">
          <SvgIcon name="trumpet" />{{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, withDefaults, watch, nextTick, ref, computed } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

const props = withDefaults(
  defineProps<{
    list: string[] // 广告列表数据
    speed?: number // 广告速度
  }>(),
  {
    list: () => [],
    speed: 1
  }
)
const container = ref<HTMLDivElement | null>(null)
const box = ref<HTMLUListElement | null>(null)
const duration = ref(0)
// 动画盒子style样式
const boxStyle = computed(() => {
  return `animation-duration: ${duration.value}s;`
})
watch(
  props.list,
  () => {
    if (props.list.length) {
      nextTick(() => {
        if (container.value && box.value) {
          const cw = container.value.offsetWidth
          const bw = box.value.offsetWidth
          if (bw > cw) {
            duration.value = Math.floor((bw / 36) * props.speed)
          }
        }
      })
    }
  },
  {
    immediate: true
  }
)
</script>
<style lang="less" scoped>
.scroll-ad-container {
  width: 100%;
  line-height: 1.5;
  font-size: 24px;
  color: #666;
  overflow: hidden;
}
.scroll-add-box {
  display: inline-flex;
  flex-wrap: nowrap;
  ul {
    flex-wrap: nowrap;
  }
  li {
    white-space: nowrap;
  }
  svg {
    margin-right: 6px;
  }
  ul + ul {
    margin-left: 24px;
  }
  li + li {
    margin-left: 12px;
  }
}
.scroll-ad-animation {
  animation: ad 2s infinite linear;
  transform: translateX(0);
}
@keyframes ad {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>
