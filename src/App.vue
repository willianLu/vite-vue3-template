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
const { width } = useWindowSize()
function setRemUnit() {
  const rem = (width.value > 750 ? 750 : width.value) / 10
  document.documentElement.style.fontSize = rem + 'px'
}
setRemUnit()
watch([width], () => {
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
}
</style>
