<template>
  <div class="flex icon-container">
    <div v-for="(item, index) in list" :key="index" class="item">
      <SvgIcon :name="item" />
      <div class="name">
        {{ item }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import SvgIcon from '@/components/svg-icon.vue'
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
  flex-wrap: wrap;
  font-size: 68px;
  color: #00c777;
  .item {
    margin: 30px;
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
