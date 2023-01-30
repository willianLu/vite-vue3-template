<template>
  <nav class="flex-center-space-between page-nav">
    <div class="left flex-v-center" @click="goBack">
      <SvgIcon name="left"></SvgIcon>
    </div>
    <div class="title flex-center">标题</div>
    <div class="right flex-v-center">右</div>
  </nav>
</template>
<script setup lang="ts">
import SvgIcon from '../SvgIcon.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
function goBack() {
  router.back()
}
</script>
<style lang="less" scoped>
.page-nav {
  height: 80px;
  .title {
    flex: 1;
    white-space: nowrap;
    height: 80px;
    overflow: hidden;
  }
  .left,
  .right {
    flex-shrink: 0;
    padding: 0 12px;
    height: 100%;
  }
}
</style>
