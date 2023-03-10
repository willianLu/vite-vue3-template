<template>
  <PageContainer>
    <div class="flex-center home-search">
      <SvgIcon class="home-search-icon" name="search" />
      <ScrollAd class="home-search-input" :list="shopList" />
    </div>
    <div class="ad-box">
      <ScrollAd class="ad-wrap" :list="adList" enable-x />
    </div>
    <div class="fc-title">站内导航</div>
    <ul class="fc-home-nav">
      <li
        v-for="(item, index) in navList"
        :key="index"
        class="flex-v-center"
        :class="{ 'hairline-border-top': index !== 0 }"
        @click="toPage(item.path)"
      >
        <SvgIcon :name="item.icon" />
        <div>
          <span>{{ item.name }}</span> {{ item.desc }}
        </div>
      </li>
    </ul>
    <template #footer>
      <PageTabbar :tabs="tabBar" />
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
import SvgIcon from '@/components/svg-icon.vue'
import {
  queryUserInfo,
  queryImgCode,
  queryList,
  queryTcUserInfo
} from '@/api/user'
import PageContainer from '@/components/page/container.vue'
import PageTabbar from '@/components/page/tabbar.vue'
import { useRouter } from 'vue-router'
import { tabBar } from '@/config'
import ScrollAd from './components/scroll-ad/index.vue'

const router = useRouter()
console.log('========首页初始化=========')
const shopList = ref(['宝宝巴士', '孙悟空', '毛笔字', '好看的电影'])
const adList = ref([
  '1.规划师二维码修改为公众号二维码!',
  '2.使用简写属性，将动画与 div 元素绑定。',
  '3.表格中的数字注明了完全支持该属性的首个浏览器版本。',
  '4.规定完成动画所花费的时间，以秒或毫秒计！'
])
const navList = [
  {
    name: 'Svg Icon',
    icon: 'icon',
    desc: '使用svg构建站点图标库',
    path: '/icons'
  },
  {
    name: 'FreeGPT',
    icon: 'robot',
    desc: '基于chatGPT的智能AI工具',
    path: '/freegpt'
  },
  {
    name: '弹窗',
    icon: 'popup',
    desc: '弹窗组件展示（基于vant）',
    path: '/component/popup'
  }
]

onMounted(async () => {
  // getData()
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
  const [tcRes] = await queryTcUserInfo()
  console.log(tcRes, '=========tc用户数据')
}

function toPage(path: string) {
  router.push(path)
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
  color: #333;
}
.home-search-input {
  flex: 1;
  line-height: 44px;
}
.ad-box {
  margin: 0 32px;
  padding: 12px 24px;
  background-color: #fff;
  .ad-wrap {
    color: #ee5353;
  }
}
.fc-title {
  margin: 32px 32px 16px;
  font-size: 36px;
  font-weight: bold;
}
.fc-home-nav {
  margin: 0 32px;
  li {
    display: flex;
    padding: 0 12px;
    height: 72px;
    background-color: #fff;
    font-size: 32px;
    color: #1296db;
    cursor: pointer;
    div {
      flex: 1;
      word-break: break-all;
      margin-left: 12px;
      font-size: 26px;
      color: #777;
      span {
        color: #ee5353;
      }
    }
  }
}
</style>
