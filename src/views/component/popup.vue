<template>
  <PageContainer>
    <template #header>
      <PageNav title="弹窗件展示"></PageNav>
    </template>
    <div>
      <van-button @click="isShowBottom = true">底部弹窗</van-button>
    </div>
    <PopupBottom v-model:show="isShowBottom">
      <div class="item" style="margin: 8px 0">👍 👎 👊 ✊ 🤛</div>
      <div v-for="item in 100" :key="item" class="item">😀 😁 😂 🤣 😃</div>
      <div class="item" style="margin: 8px 0">👍 👎 👊 ✊ 🤛</div>
    </PopupBottom>
  </PageContainer>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import PageContainer from '@/components/page/container.vue'
import PageNav from '@/components/page/nav.vue'
import PopupBottom from '@/components/popup/bottom.vue'
const isShowBottom = ref(false)
</script>
<style lang="less" scoped>
.item {
  height: 68px;
  line-height: 68px;
  font-size: 32px;
  font-weight: 700;
  border-bottom: 1px solid #eee;
  text-align: center;
  background-color: #f3f5f7;
  &:nth-child(odd) {
    background-color: #42b983;
  }
}
</style>
