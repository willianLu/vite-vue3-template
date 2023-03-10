<template>
  <RouterView v-slot="{ Component, route }">
    <KeepAlive :include="pageAliveStore.names">
      <component :is="Component" :key="route.meta.pageId"></component>
    </KeepAlive>
  </RouterView>
</template>
<script setup lang="ts">
import usePageAliveStore from '@/store/page-alive'
const pageAliveStore = usePageAliveStore()
</script>
<style>
#app {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
