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
        class="nav-item flex"
        @click="toPage(item.path)"
      >
        <SvgIcon :name="item.icon || 'smile'"></SvgIcon>
        <div>
          <p>{{ item.title }}</p>
          <p v-if="item.children" class="nav-child">
            <span
              v-for="child in item.children"
              :key="child.path"
              @click.stop="toPage(child.path)"
              >{{ child.title }}</span
            >
          </p>
        </div>
      </li>
    </ul>
    <div style="height: 168px"></div>
    <template #footer>
      <PageTabbar :tabs="tabBar" />
    </template>
  </PageContainer>
</template>
<script setup lang="ts">
import { onMounted, ref, onActivated } from 'vue'
import SvgIcon from '@/components/svg-icon.vue'
import { queryUserInfo, userLogin } from '@/api/user'
import PageContainer from '@/components/page/container.vue'
import PageTabbar from '@/components/page/tabbar.vue'
import { useRouter } from 'vue-router'
import { tabBar } from '@/config'
import ScrollAd from '@/components/scroll-ad/index.vue'
import useUserStore from '@/store/user'

defineOptions({
  name: 'HomePage'
})
const router = useRouter()
const userStore = useUserStore()
const shopList = ref(['宝宝巴士', '孙悟空', '毛笔字', '好看的电影'])
const adList = ref([
  '1.规划师二维码修改为公众号二维码!',
  '2.使用简写属性，将动画与 div 元素绑定。',
  '3.表格中的数字注明了完全支持该属性的首个浏览器版本。',
  '4.规定完成动画所花费的时间，以秒或毫秒计！'
])
const navList = [
  {
    name: 'Login',
    icon: 'smile',
    title: '去登录',
    path: '/login'
  },
  {
    name: 'Svg Icon',
    icon: 'icon',
    title: '使用svg构建站点图标库',
    path: '/icons'
  },
  {
    name: 'FreeGPT',
    icon: 'robot',
    title: '基于chatGPT的智能AI工具',
    path: '/freegpt'
  },
  {
    title: '骨架屏',
    path: '/skeleton'
  },
  {
    name: '弹窗',
    icon: 'popup',
    title: '弹窗组件展示（基于vant）',
    path: '/component/popup'
  },
  {
    title: 'H5全屏背景',
    icon: 'screen',
    children: [
      {
        title: '常规',
        path: '/full-screen'
      },
      {
        title: '底部吸顶(无头部)',
        path: '/full-screen/footer'
      },
      {
        title: '底部吸顶(实体)',
        path: '/full-screen/entity'
      },
      {
        title: '底部吸顶(虚体)',
        path: '/full-screen/virtual'
      }
    ]
  },
  {
    title: '搜索页',
    path: '/search'
  },
  {
    title: '视频特效',
    path: '/specialEffect'
  }
]

onMounted(async () => {
  getData()
})
onActivated(() => {
  console.log('==========首页激活==========')
})

async function getData() {
  const [res, resErr] = await userStore.getUserInfo()
  console.log(res, resErr, '=========用户信息')
}

function toPage(path?: string) {
  if (!path) return
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
  font-size: 32px;
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
}
.nav-item {
  padding: 24px;
  line-height: 36px;
  font-size: 26px;
  background-color: #fff;

  svg {
    margin-right: 12px;
    font-size: 36px;
    color: #ee5353;
  }
}

.nav-child {
  span {
    margin: 12px 16px 0 0;
    display: inline-block;
    padding: 0 24px;
    height: 50px;
    line-height: 50px;
    border: 1px solid #eee;
    border-radius: 25px;
    color: #333;
  }
}
</style>
