<template>
  <PageContainer
    is-full
    content-class="custom-content"
    :header-bg-color="headerBgColor"
    @scroll="handleScroll"
  >
    <template #header>
      <PageNav></PageNav>
    </template>
    <div v-for="item in 100" :key="item">红楼梦</div>
    <template #footer>
      <div style="padding: 12px">我是底部</div>
    </template>
  </PageContainer>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import PageContainer from '@/components/Page/PageContainer.vue'
import PageNav from '@/components/Page/PageNav.vue'
const headerBgColor = ref('')
function handleScroll(event: Event) {
  const { scrollTop } = event.target as any
  const num = scrollTop / 68
  headerBgColor.value =
    scrollTop > 0 ? `rgb(255, 255, 255, ${num > 1 ? 1 : num})` : ''
}
</script>
<style lang="less" scoped>
/deep/ .custom-content {
  padding-top: 80px;
  padding-top: calc(80px + constant(safe-area-inset-top));
  padding-top: calc(80px + env(safe-area-inset-top));
  padding-bottom: 80px;
  padding-bottom: calc(80px + constant(safe-area-inset-bottom));
  padding-bottom: calc(80px + env(safe-area-inset-bottom));
  background-color: #ee5353;
}
</style>
