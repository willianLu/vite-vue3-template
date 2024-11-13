<template>
  <PageContainer>
    <template #header>
      <PageNav title="特殊效果"></PageNav>
    </template>
    <div class="live-wrap">正在直播中...</div>
    <div ref="wrap" class="special-effect"></div>
  </PageContainer>
</template>
<script setup lang="ts">
import { ref, Ref, onMounted, nextTick, onUnmounted } from 'vue'
import PageContainer from '@/components/page/container.vue'
import PageNav from '@/components/page/nav.vue'
import { yyEva, YYEvaType } from 'yyeva'
import paoche from '@/assets/paoche.mp4'

defineOptions({
  name: 'SpecialEffect'
})

const wrap = ref<HTMLElement>()
let player!: YYEvaType
onMounted(() => {
  nextTick(async () => {
    if (wrap.value) {
      player = await yyEva({
        container: wrap.value, // Html Element
        videoUrl: paoche, // Video Url
        effects: {
          // 自定义字体信息 fontStyle参考https://www.w3schools.com/jsref/canvas_font.asp
          text1: {
            text: '自定义text1',
            fontStyle: '18px Microsoft YaHei',
            fontColor: '#ff0000'
          },
          text2: {
            text: '自定义text2',
            fontStyle: '20px Microsoft YaHei',
            fontColor: 'green'
          }
        },
        alphaDirection: 'right'
        // Events
        // onStart() {},
        // onStop() {},
        // onEnd() {},
        // onLoopCount(args) {},
        // onPause() {},
        // onResume() {},
        // onProcess() {},
        // onError() {}
      })
      player.start() // start player
      //   player.stop() // pause player
      //   player.destroy() // destroy player
    }
  })
})
</script>
<style lang="less" scoped>
.special-effect {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.live-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
  background-color: #fd8d34;
  font-size: 32px;
  color: #fff;
}
</style>
