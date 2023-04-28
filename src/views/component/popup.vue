<template>
  <PageContainer>
    <template #header>
      <PageNav title="弹窗展示"></PageNav>
    </template>
    <section class="container">
      <h1 class="title">底部弹窗</h1>
      <div class="flex-v-center btn-wrap">
        <div class="flex-v-center btn-item" @click="isBottomShow = true">
          <span>滑动关闭</span>
        </div>
        <div class="flex-v-center btn-item" @click="isBottomMoreShow = true">
          <span>上拉加载更多</span>
        </div>
      </div>
      <h1 class="title">提示弹窗</h1>
      <div class="flex-v-center btn-wrap">
        <div class="flex-v-center btn-item" @click="handleTipNormal">
          <span>常规</span>
        </div>
        <div class="flex-v-center btn-item" @click="handleTipRound">
          <span>圆角按钮</span>
        </div>
        <div class="flex-v-center btn-item" @click="handleTipConfirm">
          <span>确认框</span>
        </div>
        <div class="flex-v-center btn-item" @click="handleRefresh">
          <span>刷新页面</span>
        </div>
      </div>
    </section>
  </PageContainer>
  <PopupBottom v-model:show="isBottomShow" title="滑动关闭">
    <div class="item">👍 👎 👊 ✊ 🤛</div>
    <div v-for="item in 100" :key="item" class="item">😀 😁 😂 🤣 😃</div>
    <div class="item">👍 👎 👊 ✊ 🤛</div>
  </PopupBottom>
  <PopupBottom v-model:show="isBottomMoreShow" title="上拉加载更多">
    <van-list
      v-model:loading="loadingBm"
      :finished="bmFinished"
      finished-text="没有更多数据了哦～"
      @load="loadPageData"
    >
      <div v-for="item in bmCount" :key="item" class="item">😀 😁 😂 🤣 😃</div>
    </van-list>
  </PopupBottom>
</template>
<script lang="ts">
export default {
  name: 'ComponentPopupPage'
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import PageContainer from '@/components/page/container.vue'
import PageNav from '@/components/page/nav.vue'
import PopupBottom from '@/components/popup/bottom.vue'
import { showDialog, showConfirmDialog } from '@/utils/vant'
import { delay } from '@/utils/util'
import { useRouter } from 'vue-router'

const isBottomShow = ref(false)
const isBottomMoreShow = ref(false)
const bmCount = ref(20)
const loadingBm = ref(false)
const bmFinished = ref(false)
const router = useRouter()
/**
 * @description 上拉加载更多
 */
async function loadPageData() {
  if (bmCount.value < 200) {
    await delay()
    bmCount.value += 20
    loadingBm.value = false
  } else {
    bmFinished.value = true
  }
}
function handleTipNormal() {
  showDialog({
    title: '提示说明',
    message: '代码是写出来给人看的，附带能在机器上运行。',
    confirmButtonText: '知道了',
    confirmButtonColor: '#000'
  })
}
function handleTipRound() {
  showDialog({
    title: '提示说明',
    message: '代码是写出来给人看的，附带能在机器上运行。',
    confirmButtonText: '知道了',
    confirmButtonColor: '#00b983',
    theme: 'round-button'
  })
}
function handleTipConfirm() {
  showConfirmDialog({
    title: '温馨提示',
    message: '是否删除用户？',
    confirmButtonColor: '#00b983'
  })
}

function handleRefresh() {
  router.go(0)
}
</script>

<style scoped lang="less">
.container {
  padding: 0 24px;
}

.title {
  margin: 32px 0 16px;
  font-size: 30px;
}

.btn-wrap {
  flex-wrap: wrap;
}

.btn-item {
  margin-right: 12px;
  padding: 0 24px;
  height: 68px;
  border: 1px solid #eee;
  border-radius: 32px;
  background-color: #fff;
  font-size: 26px;

  svg {
    margin-right: 8px;
    font-size: 32px;
  }
}
.item {
  height: 68px;
  line-height: 68px;
  font-size: 32px;
  font-weight: 700;
  border-bottom: 1px solid #eee;
  text-align: center;
  background-color: #f3f5f7;
  &:nth-child(odd) {
    background-color: #42b983;
  }
}
</style>
