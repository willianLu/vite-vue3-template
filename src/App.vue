<template>
  <RouterView v-slot="{ Component, route }">
    <KeepAlive :include="pageAliveStore.names">
      <component :is="Component" :key="route.meta.pageId"></component>
    </KeepAlive>
  </RouterView>
</template>
<script setup lang="ts">
import { watch } from 'vue'
import usePageAliveStore from '@/store/page-alive'
import { useWindowSize } from '@vant/use'
// 获取window的大小
const rect = useWindowSize()
// 根据屏幕宽度设置rem数值
function setRemUnit() {
  const width = rect.width.value > 750 ? 750 : rect.width.value
  const rem = width / 10
  document.documentElement.style.fontSize = rem + 'px'
}
setRemUnit()
watch([rect.width], () => {
  setRemUnit()
})
const pageAliveStore = usePageAliveStore()
</script>
<style>
#app {
  max-width: 750px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  font-size: 24px;
  overflow-y: auto;
  box-shadow: 0 0 6px 2px #ddd;
}
</style>
