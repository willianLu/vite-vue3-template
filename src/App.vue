<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive :include="pageAliveStore.names">
      <component :is="Component"></component>
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
}
</style>
