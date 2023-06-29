<template>
  <van-field
    :type="isHidePassord ? 'password' : 'text'"
    autocomplete="off"
    placeholder="请输入密码"
    :right-icon="isHidePassord ? 'closed-eye' : 'eye-o'"
    @click-right-icon="handleClickRightIcon"
  >
    <template #label>
      <svg-icon class="label-icon" name="unlock"></svg-icon>
    </template>
  </van-field>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const isHidePassord = ref(true)
// 密码输入框眼镜点击
function handleClickRightIcon() {
  isHidePassord.value = !isHidePassord.value
}
</script>
