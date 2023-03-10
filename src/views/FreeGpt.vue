<template>
  <PageContainer>
    <template #header>
      <PageNav title="智能AI"></PageNav>
    </template>
    <div ref="scroll" class="scroll-wrapper">
      <div class="scroll-content">
        <div v-for="(item, index) in emojis" :key="index" class="scroll-item">
          {{ item }}
        </div>
      </div>
    </div>
  </PageContainer>
</template>
<script setup lang="ts">
import { ref, Ref, onMounted, nextTick, onUnmounted } from 'vue'
import PageContainer from '@/components/page/container.vue'
import PageNav from '@/components/page/nav.vue'
import BScroll from '@better-scroll/core'
const emojis = [
  '😀 😁 😂 🤣 😃',
  '😄 😅 😆 😉 😊',
  '😫 😴 😌 😛 😜',
  '👆🏻 😒 😓 😔 👇🏻',
  '😑 😶 🙄 😏 😣',
  '😞 😟 😤 😢 😭',
  '🤑 😲 🙄 🙁 😖',
  '👍 👎 👊 ✊ 🤛',
  '🙄 ✋ 🤚 🖐 🖖',
  '👍🏼 👎🏼 👊🏼 ✊🏼 🤛🏼',
  '☝🏽 ✋🏽 🤚🏽 🖐🏽 🖖🏽',
  '🌖 🌗 🌘 🌑 🌒',
  '💫 💥 💢 💦 💧',
  '🐠 🐟 🐬 🐳 🐋',
  '😬 😐 😕 😯 😶',
  '😇 😏 😑 😓 😵',
  '🐥 🐣 🐔 🐛 🐤',
  '💪 ✨ 🔔 ✊ ✋',
  '👇 👊 👍 👈 👆',
  '💛 👐 👎 👌 💘',
  '👍🏼 👎🏼 👊🏼 ✊🏼 🤛🏼',
  '☝🏽 ✋🏽 🤚🏽 🖐🏽 🖖🏽',
  '🌖 🌗 🌘 🌑 🌒',
  '💫 💥 💢 💦 💧',
  '🐠 🐟 🐬 🐳 🐋',
  '😬 😐 😕 😯 😶',
  '😇 😏 😑 😓 😵',
  '🐥 🐣 🐔 🐛 🐤',
  '💪 ✨ 🔔 ✊ ✋',
  '👇 👊 👍 👈 👆',
  '💛 👐 👎 👌 💘'
]
const scroll: Ref<HTMLDivElement | null> = ref(null)
let bscroll: BScroll
onMounted(() => {
  nextTick(() => {
    if (scroll.value) {
      bscroll = new BScroll(scroll.value, {
        probeType: 3,
        click: true
      })
      bscroll.on('scrollStart', () => {
        console.log('scrollStart-')
      })
      bscroll.on('scroll', ({ y }) => {
        console.log('scrolling-')
      })
      bscroll.on('scrollEnd', (pos: any) => {
        console.log(pos)
      })
    }
  })
})
onUnmounted(() => {
  bscroll.destroy()
})
</script>
<style lang="less" scoped>
.scroll-wrapper {
  height: 400px;
  position: relative;
  overflow: hidden;
  .scroll-item {
    height: 68px;
    line-height: 68px;
    font-size: 32px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
    background-color: #f3f5f7;
    text-align: center;
    &:nth-child(odd) {
      background-color: #42b983;
    }
  }
}
</style>
