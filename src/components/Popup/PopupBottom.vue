<template>
  <van-popup
    position="bottom"
    round
    style="transform: translate3d(0, 100px, 0)"
  >
    <div class="popup-bottom-header">
      <div class="popup-bottom-bar"></div>
      <h1 class="popup-bottom-title">底部弹窗</h1>
    </div>
    <div class="popup-bottom-content">
      <slot></slot>
    </div>
  </van-popup>
</template>
<script setup lang="ts"></script>
<style lang="less" scoped>
.popup-bottom-header {
  padding: 16px 0 32px;
}
.popup-bottom-bar {
  margin-bottom: 24px;
  &::before {
    content: '';
    display: block;
    margin: 0 auto;
    width: 68px;
    height: 8px;
    border-radius: 4px;
    background-color: #ddd;
  }
}
.popup-bottom-title {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
}
.popup-bottom-content {
  min-height: 168px;
  max-height: calc(100vh - 268px);
  overflow-y: auto;
}
</style>
