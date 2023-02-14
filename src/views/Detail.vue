<template>
  <PageContainer>
    <template #header>
      <PageNav :title="'详情页面ID: ' + id"></PageNav>
    </template>
    <div v-if="loading" class="skeleton">
      <van-skeleton title :row="3" />
    </div>
    <template v-else>
      <div>
        <van-button size="small" @click="toPage('special-h5')">
          特殊h5页面
        </van-button>
        <van-button size="small" @click="toPage('page-a')">页面A</van-button>
        <van-button size="small" @click="toPage('page-b')">页面B</van-button>
        <van-button size="small" @click="toPage('page-c')">页面C</van-button>
        <van-button size="small" @click="toPage('detail?id=2')"
          >详情页面2</van-button
        >
        <van-button size="small" @click="toGo(-2)">后退两步</van-button>
      </div>
      <div v-for="item in 50" :key="item">页面ID: {{ id }}</div>
    </template>
  </PageContainer>
</template>
<script lang="ts">
export default {
  name: 'DetailPage',
  beforeRouteEnter() {
    console.log('===组件内守卫=beforeRouteEnter===')
  },
  beforeRouteUpdate() {
    console.log('===组件内守卫=beforeRouteUpdate===')
  }
}
</script>
<script setup lang="ts">
import { ref, onActivated } from 'vue'
import PageContainer from '@/components/page/container.vue'
import PageNav from '@/components/page/nav.vue'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
const route = useRoute()
const id = ref(route.query.id)
const router = useRouter()
console.log('========详情页面初始化=========')
const loading = ref(true)
onActivated(() => {
  console.log('==========详情页面激活==========')
})
onBeforeRouteUpdate(to => {
  id.value = to.query.id as string
  init()
})
function init() {
  loading.value = true

  setTimeout(() => {
    loading.value = false
  }, 1000)
}
init()
function toPage(path: string) {
  router.push(`/${path}`)
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
