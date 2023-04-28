<template>
  <HorizontalAd v-if="enableX" :list="list" />
  <VerticalAd v-else :list="list" :count="count" :continuous="continuous" />
</template>
<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
import VerticalAd from './vertical.vue'
import HorizontalAd from './horizontal.vue'

withDefaults(
  defineProps<{
    list: string[] // 广告列表数据
    count?: number // 显示广告个数
    continuous?: boolean // 是否是连续的
    enableX?: boolean // 是否启动横向滚动
  }>(),
  {
    list: () => [],
    count: 1,
    continuous: false,
    enableX: false
  }
)
</script>
