<script setup lang="ts">
import usePageAliveStore from '@/store/pageAlive'
const pageAliveStore = usePageAliveStore()
</script>

<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive :include="pageAliveStore.names">
      <component :is="Component"></component>
    </KeepAlive>
  </RouterView>
</template>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
