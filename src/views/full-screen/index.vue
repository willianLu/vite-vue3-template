<template>
  <PageContainer content-class="custom-content" fullscreen>
    <template #header>
      <PageNav title="H5全屏背景" />
    </template>
    <div
      style="
        padding: 24px;
        margin: 16px 0 120px;
        height: 1000px;
        background-color: #fff;
      "
    ></div>
  </PageContainer>
</template>
<script>
export default {
  name: 'FullScreenPage'
}
</script>
<script setup>
import PageContainer from '@/components/Page/container.vue'
import PageNav from '@/components/Page/nav.vue'
</script>
<style lang="less" scoped>
/deep/ .custom-content {
  padding: 0 24px;
  background: url(@/assets/images/full_bg.png) no-repeat,
    url(@/assets/images/full_bottom_bg.png) no-repeat, #faf2ff;
  background-size: 100% auto;
  background-position: 0 0, left bottom;
}
</style>
