<template>
  <div
    class="scroll-ad-container"
    :style="{
      height: singleHeight * (count > list.length ? list.length : count) + 'px'
    }"
  >
    <ul
      ref="box"
      :class="{
        'scroll-ad-transition': isTransition,
        'scroll-add-box': continuous
      }"
      :style="positionStyle"
    >
      <li v-for="(item, index) in showList" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import {
  defineProps,
  withDefaults,
  watch,
  nextTick,
  ref,
  computed,
  onUnmounted
} from 'vue'

const props = withDefaults(
  defineProps<{
    list: string[] // 广告列表数据
    count?: number // 显示广告个数
    continuous?: boolean // 是否是连续的
  }>(),
  {
    list: () => [],
    count: 1,
    continuous: false
  }
)
// 显示广告列表
const showList = ref<string[]>([])
// 当前广告下标
const currentIndex = ref(0)
// 是否执行transition动画
const isTransition = ref(false)
// 动画盒子ref
const box = ref<HTMLUListElement | null>(null)
// 单个广告高度
const singleHeight = ref(0)
// 执行动画的timeout对象ID
let timer: ReturnType<typeof setTimeout> | null = null
// 监听广告列表数据
watch(
  props.list,
  () => {
    if (props.list.length) {
      // 处理广告数据，复制一份，方便动画实现
      showList.value = [...props.list, ...props.list]
      nextTick(() => {
        if (box.value) {
          // 获取单个广告高度
          singleHeight.value = (
            box.value.children[0] as HTMLLIElement
          ).offsetHeight
          // 非持续的动画，执行transition动画
          // transition动画为单个广告动画，单个执行完成时，停顿1s再执行第二个广告动画
          if (!props.continuous) {
            handleExecTransition()
          }
        }
      })
    }
  },
  {
    immediate: true
  }
)
// 动画盒子style样式
const positionStyle = computed(() => {
  if (props.continuous) {
    return `animation-duration: ${props.list.length}s;`
  }
  const position = currentIndex.value * singleHeight.value
  return `transform: translateY(-${position}px);`
})
// 处理执行transition动画
async function handleExecTransition() {
  timer = setTimeout(() => {
    isTransition.value = true
    currentIndex.value += 1
    handleTransitionEnd()
  }, 1000)
}
// 执行transition动画结束
async function handleTransitionEnd() {
  timer = setTimeout(() => {
    isTransition.value = false
    if (currentIndex.value === props.list.length) {
      currentIndex.value = 0
    }
    handleExecTransition()
  }, 1000)
}
onUnmounted(() => {
  if (timer) {
    clearTimeout(timer)
  }
})
</script>
<style lang="less" scoped>
.scroll-ad-container {
  width: 100%;
  line-height: 1.5;
  font-size: 24px;
  color: #666;
  overflow: hidden;
  li {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.scroll-add-box {
  animation: ad 1s infinite linear 1s;
  transform: translateY(0);
}
@keyframes ad {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-50%);
  }
}
.scroll-ad-transition {
  transition: transform 1s;
}
</style>
