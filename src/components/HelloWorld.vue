<script setup lang="ts">
import {
  // ref,
  inject,
  // reactive,
  defineExpose,
  // defineProps,
  defineEmits,
  computed
  // getCurrentInstance
} from 'vue'
import testHook from './test'
const msg = inject('msg')
const childFun = (name: string) => {
  console.log('子组件方法，调用者：', name)
}
childFun('子组件')
defineExpose({
  childFun,
  msg
})
const test = testHook()

const testA = computed(() => {
  return test.testA + 1
})

// const props = defineProps({ name: String })
const emits = defineEmits(['update:name'])

const handleTest = function () {
  emits('update:name', '你是谁')
  test.testA = 20
}
// const instance = getCurrentInstance()
// console.log(instance, '=============组件实例')
</script>

<template>
  <h1>{{ msg }}</h1>
  <h2>{{ test.testA }} -- {{ testA }}</h2>
  <div>
    <button @click="handleTest">点击按钮</button>
    <!-- <div>{{ name }}</div> -->
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
