<template>
  <PageContainer content-class="custom-content">
    <template #header>
      <PageNav title="搜索页" />
      <div class="search-wrap flex-v-center">
        <svg-icon name="search" />
        <van-field
          v-model="val"
          placeholder="请输入搜索内容"
          clearable
          @input="handleInput"
        />
      </div>
    </template>
    <section v-show="loading">
      <div
        v-for="item in 5"
        :key="item"
        class="skeleton-item flex-space-between"
      >
        <!-- width可以传单位px、%、vw等，未带单位则默认px，若单位为px会自动转换vw -->
        <QtSkeleton width="80" height="80" radius="50%" right="16px" />
        <div style="flex: 1">
          <QtSkeleton width="50%" />
          <QtSkeleton width="90%" top="16px" />
          <QtSkeleton width="90%" top="16px" />
        </div>
      </div>
    </section>
    <VanEmpty
      v-show="!loading && list.length === 0"
      :image="isSearch ? undefined : 'search'"
      :description="desc"
    ></VanEmpty>
    <VanList
      v-show="!loading && list.length"
      v-model:loading="loadingList"
      :finished="finished"
      finished-text="没有更多数据了哦～"
      @load="loadPageData"
    >
      <div
        v-for="(item, index) in list"
        :key="val + index"
        class="list-item flex-space-between"
      >
        <div class="avatar"></div>
        <div style="flex: 1">
          <p class="title">{{ item.title + index }}</p>
          <p class="desc">{{ item.desc }}</p>
          <p class="desc">{{ item.desc2 }}</p>
        </div>
      </div>
    </VanList>
  </PageContainer>
</template>
<script setup>
import { ref, computed, reactive } from 'vue'
import PageContainer from '@/components/Page/container.vue'
import PageNav from '@/components/Page/nav.vue'
import QtSkeleton from '@/components/Skeleton/index.vue'
import { delay } from '@/utils/util'
const loading = ref(false)
const val = ref('')
const list = ref([])
const isSearch = ref(false)
const pageInfo = reactive({
  val: '',
  page: 1,
  total: 0
})
const loadingList = ref(false)
const finished = ref(false)
const desc = computed(() => {
  return isSearch.value ? '暂无数据～' : '输入内容，即可搜索～'
})
async function getList() {
  const item = {
    title: '提示词：' + val.value,
    desc: '这是一段描述，' + val.value,
    desc2: '这是一段描述2，' + val.value
  }
  const res = new Array(10).fill(item)
  await delay(1000)
  if (val.value === 'empty' || val.value === '') return
  list.value = list.value.concat(res)
  pageInfo.total = 3
  finished.value = pageInfo.page >= pageInfo.total
}
/**
 * @description 上拉加载更多
 */
async function loadPageData() {
  if (pageInfo.page <= pageInfo.total) {
    pageInfo.page++
    await getList()
    loadingList.value = false
  }
}
let time = null
function handleInput() {
  if (time) {
    clearTimeout(time)
  }
  time = setTimeout(async () => {
    // 防止中文输入法，内容无变化做请求
    if (pageInfo.val === val.value) return
    // 记录请求的输入值
    pageInfo.val = val.value
    pageInfo.page = 1
    pageInfo.total = 0
    list.value = []
    finished.value = false
    if (val.value) {
      loading.value = true
      await getList()
      loading.value = false
    }
    isSearch.value = !!val.value
  }, 500)
}
</script>
<style lang="less" scoped>
:deep(.custom-content) {
  padding: 24px;
  box-sizing: border-box;
}
.skeleton-item,
.list-item {
  padding: 24px;
  background-color: #fff;
}
.search-wrap {
  margin: 0 32px 16px;
  padding: 0 24px;
  height: 68px;
  border: 1px solid #eee;
  border-radius: 34px;
  svg {
    margin-right: 12px;
    font-size: 32px;
    color: #666;
  }
  .van-field {
    flex: 1;
    padding: 0;
    background-color: transparent;
    border: none;
    font-size: 28px;
  }
}
.avatar {
  margin-right: 16px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #eee;
}
.title {
  line-height: 36px;
  font-size: 32px;
  font-weight: bold;
}
.desc {
  margin-top: 12px;
  font-size: 28px;
  color: #999;
}
</style>
