<template>
  <PageContainer>
    <div>个人中心</div>
    <template #footer>
      <PageTabbar :tabs="tabs" />
    </template>
  </PageContainer>
</template>
<script lang="ts">
export default {
  name: 'MyPage'
}
</script>
<script setup lang="ts">
import PageContainer from '@/components/page/container.vue'
import PageTabbar from '@/components/page/tabbar.vue'
import { tabBar } from '@/config'
console.log('========个人中心初始化=========')
const tabs = tabBar
</script>
<style lang="less" scoped></style>
