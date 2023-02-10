<template>
  <PageContainer>
    <div class="flex-center home-search">
      <SvgIcon class="home-search-icon" name="search" />
      <ScrollAd class="home-search-input" :list="shopList" />
    </div>
    <div class="ad-box">
      <ScrollAd class="ad-wrap" :list="adList" enable-x />
    </div>
    <div class="margin-32">
      <a href="http://localhost:5173/#/icons" style="margin-right: 16px"
        >icon链接跳转</a
      >
      <a href="http://localhost:6800">本地页面</a>
    </div>
    <div class="margin-32">
      <van-button size="small" @click="toPage('normal-h5')">
        常规h5页面
      </van-button>
      <van-button size="small" @click="toPage('special-h5')">
        特殊h5页面
      </van-button>
      <van-button size="small" @click="toPage('icons')">Icon页面</van-button>
      <van-button size="small" @click="toGo(1)">向前一步</van-button>
      <van-button size="small" @click="toGo(2)">向前多步</van-button>
    </div>
    <div class="margin-32">
      <van-button
        :loading="isShow"
        type="success"
        loading-text="查看"
        @click="handleClick"
        >查看</van-button
      >
    </div>

    <PopupCenter v-model:show="showCenter" title="请选择高考科目">
      <div v-for="item in 10" :key="item">内容</div>
    </PopupCenter>
    <PopupBottom v-model:show="isShow">
      <div style="padding-bottom: 32px">我是头部</div>
      <div v-for="item in 100" :key="item">内容</div>
      <div style="padding-bottom: 32px">我是底部</div>
    </PopupBottom>
    <template #footer>
      <PageTabbar :tabs="tabs" />
    </template>
  </PageContainer>
</template>
<script lang="ts">
export default {
  name: 'HomePage'
}
</script>
<script setup lang="ts">
import { onMounted, ref, onActivated } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { queryUserInfo, queryImgCode, queryList } from '@/api/user'
import PageContainer from '@/components/Page/PageContainer.vue'
import PageTabbar from '@/components/Page/PageTabbar.vue'
// import Loading from '@/components/Loading/index'
import PopupCenter from '@/components/Popup/PopupCenter.vue'
import PopupBottom from '@/components/Popup/PopupBottom.vue'
import { useRouter } from 'vue-router'
import Config from '@/config'
import ScrollAd from './components/ScrollAd/index.vue'

const isShow = ref(false)
const showCenter = ref(false)
const router = useRouter()
const tabs = Config.tabs as any
console.log('========首页初始化=========')
const shopList = ref(['宝宝巴士', '孙悟空', '毛笔字', '好看的电影'])
const adList = ref([
  '1.规划师二维码修改为公众号二维码!',
  '2.使用简写属性，将动画与 div 元素绑定。',
  '3.表格中的数字注明了完全支持该属性的首个浏览器版本。',
  '4.规定完成动画所花费的时间，以秒或毫秒计！'
])

onMounted(async () => {
  // getData()
  console.log('==========首页onMounted')
})
onActivated(() => {
  console.log('==========首页激活==========')
})
async function getData() {
  const [res] = await queryUserInfo()
  console.log(res, '=========用户数据')
  const [imgRes] = await queryImgCode()
  console.log(imgRes, '=========图片数据')
  const [listRes] = await queryList()
  console.log(listRes, '=========列表数据')
}
function handleClick() {
  // getData()
  isShow.value = !isShow.value
  // if (isShow.value) {
  //   setTimeout(() => {
  //     isShow.value = false
  //   }, 2000)
  // }
}
function toPage(path: string) {
  router.push(`/${path}`)
}
function toGo(delta: number) {
  router.go(delta)
}
</script>
<style lang="less" scoped>
.home-search {
  margin: 32px;
  padding: 12px 24px;
  height: 68px;
  background-color: #fff;
  border-radius: 34px;
  box-sizing: border-box;
}
.home-search-icon {
  flex-shrink: 0;
  margin-right: 8px;
  color: #ee5353;
}
.home-search-input {
  flex: 1;
  line-height: 44px;
}
.ad-box {
  margin: 0 32px 32px;
  padding: 12px 24px;
  background-color: #fff;
  .ad-wrap {
    color: #ee5353;
  }
}
.margin-32 {
  margin: 0 32px 32px;
}
</style>
