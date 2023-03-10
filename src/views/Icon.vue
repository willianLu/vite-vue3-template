<template>
  <PageContainer>
    <template #header>
      <PageNav title="Svg Icon库"></PageNav>
    </template>
    <div class="flex icon-container">
      <div v-for="(item, index) in list" :key="index" class="item">
        <SvgIcon :name="item" />
        <div class="name">
          {{ item }}
        </div>
      </div>
    </div>
  </PageContainer>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import SvgIcon from '@/components/svg-icon.vue'
import PageContainer from '@/components/page/container.vue'
import PageNav from '@/components/page/nav.vue'
console.log('========Icon初始化=========')
// svg文件名集合
const list = ref<string[]>([])
// 解析svg文件名称
const modules = import.meta.glob('@/icons/*.svg')
Object.keys(modules).forEach((key: string) => {
  const name = key.match(/.*\/(.+)\.svg$/)
  if (name !== null) {
    list.value.push(name[1])
  }
})
</script>
<style lang="less" scoped>
.icon-container {
  padding: 16px 0;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 68px;
  color: #ee5353;
  .item {
    margin: 16px;
    width: 110px;
    text-align: center;
    .name {
      font-size: 24px;
      padding-top: 15px;
      color: #030303;
    }
  }
}
</style>
