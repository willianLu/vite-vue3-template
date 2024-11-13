<template>
  <PageContainer fullscreen>
    <template #header>
      <PageNav title="H5全屏背景-底部吸顶(虚体)" />
    </template>
    <div class="custom-content">
      <div style="height: 1000px; background-color: #fff"></div>
    </div>

    <template #footer>
      <div class="footer-btn flex-center">
        <svg-icon name="add-outline"></svg-icon>
      </div>
    </template>
  </PageContainer>
</template>
<script setup lang="ts">
import PageContainer from '@/components/page/container.vue'
import PageNav from '@/components/page/nav.vue'

defineOptions({
  name: 'FullScreenPage'
})
</script>
<style lang="less" scoped>
.custom-content {
  padding: 0 24px;
  background: url(@/assets/images/full_bg.png) no-repeat,
    url(@/assets/images/full_bottom_bg.png) no-repeat, #faf2ff;
  background-size: 100% auto;
  background-position: 0 0, left bottom;
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
