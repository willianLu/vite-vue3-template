<template>
  <van-popup round>
    <section class="custom-popup-container">
      <h1 v-if="title" class="custom-popup-title">{{ title }}</h1>
      <div class="custom-popup-content">
        <slot></slot>
      </div>
    </section>
  </van-popup>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>
<style lang="less" scoped>
.custom-popup-container {
  padding: 16px;
  width: 696px;
  box-sizing: border-box;
}
.custom-popup-title {
  margin: 8px 0 32px;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
}
.custom-popup-content {
  min-height: 168px;
  max-height: calc(100vh - 300px);
  overflow-y: auto;
}
</style>
