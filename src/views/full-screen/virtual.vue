<template>
  <PageContainer
    content-class="custom-content"
    footer-class="footer-box"
    fullscreen
    :footer-height="138"
  >
    <template #header>
      <PageNav title="H5全屏背景-底部吸顶(虚体)" />
    </template>
    <div
      style="margin: 16px 0 120px; height: 1000px; background-color: #fff"
    ></div>
    <template #footer>
      <div class="footer-btn flex-center">
        <svg-icon name="add-outline"></svg-icon>
      </div>
    </template>
  </PageContainer>
</template>
<script>
export default {
  name: 'FullScreenPage'
}
</script>
<script setup>
import PageContainer from '@/components/page/container.vue'
import PageNav from '@/components/page/nav.vue'
</script>
<style lang="less" scoped>
:deep(.custom-content) {
  padding: 0 24px;
  background: url(@/assets/images/full_bg.png) no-repeat,
    url(@/assets/images/full_bottom_bg.png) no-repeat, #faf2ff;
  background-size: 100% auto;
  background-position: 0 0, left bottom;
}
:deep(.footer-box) {
  background-color: transparent;
  border: none;
}
.footer-btn {
  margin: 24px auto;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: #ee5353;
  font-size: 68px;
  color: #fff;
}
</style>
