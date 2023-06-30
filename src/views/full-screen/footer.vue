<template>
  <PageContainer content-class="custom-content">
    <div
      style="margin: 16px 0 120px; height: 1000px; background-color: #fff"
    ></div>
    <template #footer>
      <div class="footer-btn">
        <div class="flex-center">立即支付</div>
      </div>
    </template>
  </PageContainer>
</template>
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
.footer-btn {
  padding: 24px;
  div {
    width: 100%;
    height: 90px;
    border-radius: 45px;
    background-color: #ee5353;
    font-size: 32px;
    color: #fff;
  }
}
</style>
