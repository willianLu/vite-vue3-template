<template>
  <PageContainer>
    <template #header>
      <PageNav></PageNav>
    </template>
    <div v-for="item in 100" :key="item">红楼梦</div>
    <template #footer>
      <div style="padding: 12px">我是底部</div>
    </template>
  </PageContainer>
</template>
<script setup lang="ts"></script>
<style lang="less" scoped></style>
