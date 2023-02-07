<template>
  <PageContainer>
    <template #header>
      <PageNav title="标准h5">
        <template #left>
          <SvgIcon class="pet" name="pet" />
        </template>
        <template #right>
          <SvgIcon class="shopping" name="user" @click="toUser" />
        </template>
      </PageNav>
    </template>
    <div>
      <van-button size="small" @click="toPage('special-h5')">
        特殊h5页面
      </van-button>
      <van-button size="small" @click="toForward"> 向前走 </van-button>
    </div>
    <div v-for="item in 50" :key="item">红楼梦</div>
  </PageContainer>
</template>
<script lang="ts">
export default {
  name: 'NormalH5Page'
}
</script>
<script setup lang="ts">
import { onActivated } from 'vue'
import PageContainer from '@/components/Page/PageContainer.vue'
import PageNav from '@/components/Page/PageNav.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { useRouter } from 'vue-router'
console.log('========标准h5初始化=========')
onActivated(() => {
  console.log('==========标准h5激活==========')
})
const router = useRouter()
function toUser() {
  router.back()
  // router.replace('/my')
}
function toPage(path: string) {
  router.push(`/${path}`)
}
function toForward() {
  router.forward()
}
</script>
<style lang="less" scoped>
.pet {
  font-size: 32px;
  color: #078d6b;
}
.shopping {
  margin-right: 24px;
  font-size: 32px;
  color: #ee5353;
  cursor: pointer;
}
</style>
