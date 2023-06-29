<template>
  <PageContainer>
    <template #header>
      <PageNav title="短信验证"></PageNav>
    </template>
    <div class="sms-wrap">
      <!-- 输入手机号，调起手机号键盘 -->
      <van-field
        v-model="phone"
        type="tel"
        maxlength="11"
        autocomplete="off"
        placeholder="请输入手机号"
        :formatter="handleFormatPhone"
      >
        <template #label>
          <svg-icon class="label-icon" name="phone"></svg-icon>
        </template>
      </van-field>
      <van-field
        v-model="code"
        class="code-item"
        maxlength="6"
        autocomplete="off"
        placeholder="请输入验证码"
        :formatter="handleFormatTrim"
        @click-right-icon="handleGetCode"
      >
        <template #label>
          <svg-icon class="label-icon" name="safety"></svg-icon>
        </template>
        <template #right-icon>
          <span class="code-tip" :class="{ gray: countDown > 0 }">{{
            codeTipText
          }}</span>
        </template>
      </van-field>
      <div
        class="flex-center common-btn"
        :class="{ active: isActive }"
        @click="handleNextStep"
      >
        下一步
      </div>
    </div>
  </PageContainer>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import PageContainer from '@/components/page/container.vue'
import PageNav from '@/components/page/nav.vue'
import { showToast } from 'vant'
import { delay } from '@/utils/util'
import {
  validatePhone,
  handleFormatPhone,
  handleFormatTrim
} from '@/utils/form'
import Loading from '@/components/loading'
import useCountDown from '@/hooks/useCountDown'

defineOptions({
  name: 'ForgetPasswordPage'
})
const router = useRouter()
const phone = ref('')
const code = ref('')
const isActive = computed(() => {
  return phone.value.length && code.value.length
})
const { countDown, countDownStart } = useCountDown({
  key: 'ForgetPasswordCountDown'
})
const codeTipText = computed(() => {
  return countDown.value ? countDown.value + 's' : '获取验证码'
})

// 获取验证码
async function handleGetCode() {
  if (countDown.value > 0) return
  if (!validatePhone(phone.value)) {
    return showToast('请输入正确的手机号')
  }
  Loading.show()
  await delay()
  Loading.hide()
  countDownStart()
}
async function handleNextStep() {
  if (!isActive.value) return
  if (!validatePhone(phone.value)) {
    return showToast('请输入正确的手机号')
  }
  if (code.value.length < 6) {
    return showToast('请输入正确的验证码')
  }
  Loading.show()
  await delay()
  Loading.hide()
  router.push({ name: 'ModifyPasswordPage' })
}
</script>
<style lang="less" scoped>
@import url('./common.less');
:deep(.van-field) {
  background-color: #fff;
}
.sms-wrap {
  padding: 128px 64px;
}
.code-item {
  margin-bottom: 128px;
}
.code-tip {
  color: #fe7000;
  &.gray {
    color: #999;
  }
}
</style>
