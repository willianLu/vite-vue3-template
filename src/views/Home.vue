<template>
  <h1>我是首页22</h1>
  <SvgIcon name="arrow" />
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { queryUserInfo } from '@/api/user'

onMounted(async () => {
  const res = await queryUserInfo()
  console.log(res, '=========用户数据')
})
</script>
<style lang="less" scoped>
h1 {
  color: @color;
}
</style>
