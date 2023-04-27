<template>
  <PageContainer content-class="custom-content">
    <template #header>
      <PageNav title="骨架屏" />
    </template>
    <h1 class="title">常规</h1>
    <div class="skeleton-item">
      <QtSkeleton width="30%" />
      <QtSkeleton width="60%" top="16px" />
      <QtSkeleton width="90%" top="16px" />
    </div>
    <h1 class="title">头像</h1>
    <div class="skeleton-item flex-space-between">
      <!-- width可以传单位px、%、vw等，未带单位则默认px，若单位为px会自动转换vw -->
      <QtSkeleton width="80" height="80" radius="50%" right="16px" />
      <div style="flex: 1">
        <QtSkeleton width="50%" />
        <QtSkeleton width="90%" top="16px" />
        <QtSkeleton width="90%" top="16px" />
      </div>
    </div>
    <h1 class="title">特殊</h1>
    <div class="skeleton-item">
      <!-- width可以传单位px、%、vw等，未带单位则默认px，若单位为px会自动转换vw -->
      <QtSkeleton width="30%" bottom="24px" />
      <div class="flex-center-space-between">
        <div style="flex: 1">
          <QtSkeleton width="80%" />
          <QtSkeleton top="16px" />
        </div>
        <QtSkeleton width="200" height="68" radius="34" left="68" />
      </div>
    </div>
  </PageContainer>
</template>
<script setup>
import PageContainer from '@/components/Page/container.vue'
import PageNav from '@/components/Page/nav.vue'
import QtSkeleton from '@/components/skeleton/index.vue'
</script>
<style lang="less" scoped>
:deep(.custom-content) {
  padding: 0 24px;
}
.title {
  margin: 32px 0 16px;
  font-size: 30px;
}
.skeleton-item {
  padding: 24px;
  background-color: #fff;
}
</style>
