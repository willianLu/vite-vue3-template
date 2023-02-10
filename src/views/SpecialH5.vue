<template>
  <PageContainer
    is-full
    content-class="custom-content"
    :header-bg-color="headerBgColor"
    @scroll="handleScroll"
  >
    <template #header>
      <PageNav title="特殊H5"></PageNav>
    </template>
    <div v-if="loading" class="skeleton">
      <van-skeleton title :row="3" />
    </div>
    <template v-else>
      <div>
        <a href="http://localhost:6800">本地页面</a>
      </div>
      <div>
        <van-button size="small" @click="toPage('normal-h5')">
          标准h5页面
        </van-button>
        <van-button size="small" @click="toPage('page-a')">页面A</van-button>
        <van-button size="small" @click="toPage('page-b')">页面B</van-button>
        <van-button size="small" @click="toPage('page-c')">页面C</van-button>
      </div>
      <div v-for="item in 50" :key="item">红楼梦</div>
    </template>
    <template #footer>
      <div style="padding: 12px">我是底部</div>
    </template>
  </PageContainer>
</template>
<script lang="ts">
export default {
  name: 'SpecialH5Page'
}
</script>
<script setup lang="ts">
import { ref, onActivated, onMounted } from 'vue'
import PageContainer from '@/components/Page/PageContainer.vue'
import PageNav from '@/components/Page/PageNav.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
console.log('========特殊h5初始化=========')
onActivated(() => {
  console.log('==========特殊h5激活==========')
})
const loading = ref(true)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
const headerBgColor = ref('')
function handleScroll(event: Event) {
  const { scrollTop } = event.target as any
  const num = scrollTop / 68
  headerBgColor.value =
    scrollTop > 0 ? `rgb(255, 255, 255, ${num > 1 ? 1 : num})` : ''
}
function toPage(path: string) {
  router.push(`/${path}`)
}
function toGo(delta: number) {
  router.go(delta)
}
</script>
<style lang="less" scoped>
/deep/ .custom-content {
  padding-top: 80px;
  padding-top: calc(80px + constant(safe-area-inset-top));
  padding-top: calc(80px + env(safe-area-inset-top));
  padding-bottom: 80px;
  padding-bottom: calc(80px + constant(safe-area-inset-bottom));
  padding-bottom: calc(80px + env(safe-area-inset-bottom));
  background-color: #ee5353;
}
.skeleton {
  margin: 24px 0;
  padding: 24px 0;
  background-color: #fff;
}
</style>
