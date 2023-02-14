<template>
  <PageContainer>
    <template #header>
      <PageNav title="页面A"></PageNav>
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
        <van-button size="small" @click="toReplacePage('page-a')"
          >页面A</van-button
        >
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
        <van-button size="small" @click="toGo(-2)">后退两步</van-button>
        <van-button size="small" @click="toGo(-3)">后退三步</van-button>
        <van-button size="small" @click="toGo(-4)">后退四步</van-button>
        <van-button size="small" @click="toGo(-5)">后退五步</van-button>
        <van-button size="small" @click="toGo(0)">不前进</van-button>
        <van-button size="small" @click="toForward">forward前进</van-button>
        <van-button size="small" @click="toGo(1)">向前一步</van-button>
        <van-button size="small" @click="toGo(2)">向前二步</van-button>
        <van-button size="small" @click="toGo(3)">向前三步</van-button>
      </div>
      <div>
        <input placeholder="请输入文本" />
      </div>
      <div v-for="item in 50" :key="item">页面A</div>
    </template>
  </PageContainer>
</template>
<script lang="ts">
export default {
  name: 'APage',
  beforeRouteUpdate() {
    console.log('===组件内守卫=beforeRouteUpdate===')
  }
}
</script>
<script setup lang="ts">
import { onActivated, ref, onMounted } from 'vue'
import PageContainer from '@/components/page/container.vue'
import PageNav from '@/components/page/nav.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
console.log('========页面A初始化=========')
onActivated(() => {
  console.log('==========页面A激活==========')
})
const loading = ref(true)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
function toPage(path: string) {
  router.push(`/${path}`)
}
function toReplacePage(path: string) {
  router.replace(`/${path}`)
}
function toForward() {
  router.forward()
}
function toGo(delta: number) {
  router.go(delta)
}
</script>
<style lang="less" scoped>
.skeleton {
  margin: 24px 0;
  padding: 24px 0;
  background-color: #fff;
}
</style>
