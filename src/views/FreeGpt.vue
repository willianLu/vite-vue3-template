<template>
  <PageContainer>
    <template #header>
      <PageNav title="智能AI"></PageNav>
    </template>
  </PageContainer>
</template>
<script setup lang="ts">
import { ref, Ref, onMounted, nextTick, onUnmounted } from 'vue'
import PageContainer from '@/components/page/container.vue'
import PageNav from '@/components/page/nav.vue'
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
