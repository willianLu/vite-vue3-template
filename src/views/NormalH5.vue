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
    <div v-if="loading" class="skeleton">
      <van-skeleton title :row="3" />
    </div>
    <template v-else>
      <div>
        <a href="http://localhost:6800">本地页面</a>
      </div>
      <div>
        <van-button size="small" @click="toPage('special-h5')">
          特殊h5页面
        </van-button>
        <van-button size="small" @click="toPage('page-a')">页面A</van-button>
        <van-button size="small" @click="toPage('page-b')">页面B</van-button>
        <van-button size="small" @click="toPage('page-c')">页面C</van-button>
        <van-button size="small" @click="toPage('detail?id=1')"
          >详情页面1</van-button
        >
        <van-button size="small" @click="toPage('detail?id=2')"
          >详情页面2</van-button
        >
        <van-button size="small" @click="toPage('order-detail/1')"
          >订单详情页面1</van-button
        >
        <van-button size="small" @click="toPage('order-detail/2')"
          >订单详情页面2</van-button
        >
        <van-button size="small" @click="toForward"> 向前走 </van-button>
        <van-button size="small" @click="toReplacePage('normal-h5')">
          replace: 标准h5页面
        </van-button>
        <van-button size="small" @click="toReplacePage('special-h5')">
          replace: 特殊h5页面
        </van-button>
      </div>
      <div v-for="item in 50" :key="item">红楼梦</div>
    </template>
  </PageContainer>
</template>
<script lang="ts">
export default {
  name: 'NormalH5Page',
  beforeRouteEnter() {
    console.log('===组件内守卫=beforeRouteEnter===')
  },
  beforeRouteUpdate() {
    console.log('===组件内守卫=beforeRouteUpdate===')
  }
}
</script>
<script setup lang="ts">
import { onActivated, ref, onMounted } from 'vue'
import PageContainer from '@/components/page/container.vue'
import PageNav from '@/components/page/nav.vue'
import SvgIcon from '@/components/svg-icon.vue'
import { useRouter } from 'vue-router'
import { session } from '@/utils/storage'
console.log('========标准h5初始化=========')
session.setItem('normalH5', '访问页面')
onActivated(() => {
  console.log('==========标准h5激活==========')
})
const loading = ref(true)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
const router = useRouter()
function toUser() {
  router.back()
}
function toPage(path: string) {
  router.push(`/${path}`)
}
function toReplacePage(path: string) {
  router.replace(`/${path}`)
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
.skeleton {
  margin: 24px 0;
  padding: 24px 0;
  background-color: #fff;
}
</style>
