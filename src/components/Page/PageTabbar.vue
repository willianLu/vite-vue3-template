<template>
  <div class="page-tabbar flex-center hairline-border-top">
    <div
      v-for="item in tabs"
      :key="item.title"
      class="tabbar-item flex-center"
      @click="toPage(item)"
    >
      <div :class="{ active: route.fullPath === item.url }">
        <p>
          <SvgIcon class="tabbar-icon" :name="item.icon"></SvgIcon>
        </p>
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import SvgIcon from '../SvgIcon.vue'
import { useRouter, useRoute } from 'vue-router'
import { Tabbar } from '@/types'

defineProps<{
  tabs: Tabbar[]
}>()
const router = useRouter()
const route = useRoute()
function toPage(item: Tabbar) {
  if (route.fullPath === item.url) return
  router.replace(item.url)
}
</script>
<style lang="less" scoped>
.page-tabbar {
  height: 100px;
  .tabbar-item {
    flex: 1;
    height: 100%;
    text-align: center;
    font-size: 24px;
    color: #000;
    & > div {
      cursor: pointer;
    }
    .active {
      color: #ee5353;
    }
    .tabbar-icon {
      margin-bottom: 6px;
      font-size: 48px;
    }
  }
}
</style>
