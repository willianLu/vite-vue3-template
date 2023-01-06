<template>
  <h1>我是首页22</h1>
  <div>
    <SvgIcon name="checkbox" />
  </div>
  <van-button
    :loading="isShow"
    type="success"
    loading-text="查看"
    @click="handleClick"
    >查看</van-button
  >
  <PopupCenter v-model:show="showCenter" title="请选择高考科目">
    <div v-for="item in 10" :key="item">内容</div>
  </PopupCenter>
  <PopupBottom v-model:show="isShow">
    <div style="padding-bottom: 32px">我是头部</div>
    <div v-for="item in 100" :key="item">内容</div>
    <div style="padding-bottom: 32px">我是底部</div>
  </PopupBottom>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { queryUserInfo, queryImgCode, queryList } from '@/api/user'
// import Loading from '@/components/Loading/index'
import PopupCenter from '@/components/Popup/PopupCenter.vue'
import PopupBottom from '@/components/Popup/PopupBottom.vue'
import Config from '@/config'

const isShow = ref(false)
const showCenter = ref(false)
onMounted(async () => {
  const res = await queryUserInfo()
  console.log(res, Config, '=========用户数据')
  const imgRes = await queryImgCode()
  console.log(imgRes, '=========图片数据')
  const listRes = await queryList()
  console.log(listRes, '=========列表数据')
})
function handleClick() {
  isShow.value = !isShow.value
  // if (isShow.value) {
  //   setTimeout(() => {
  //     isShow.value = false
  //   }, 2000)
  // }
}
</script>
<style lang="less" scoped>
h1 {
  color: @color;
}
</style>
