<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref, provide, onMounted } from 'vue'
const msg = ref('提供者')
provide('msg', msg)
// const child = ref()
onMounted(() => {
  // console.log('=============')
  // console.log(child.value.msg)
  console.log('=============')
  // child.value.childFun('父组件')
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
