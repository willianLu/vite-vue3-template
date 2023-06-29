<template>
  <div class="login-wrap">
    <div class="login-logo">
      <img src="@/assets/images/logo.png" />
    </div>
    <div class="login-box">
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
      <FkPassword v-model="password" maxlength="20" class="password-item" />
      <div class="flex-v-center agreement-wrap">
        <van-checkbox v-model="isAgree">我已阅读并同意</van-checkbox>
        <span class="agreement-bar" @click="toPage('PrivacyPolicyPage')"
          >《隐私政策》</span
        >
        <span class="agreement-bar" @click="toPage('UserServicePage')"
          >《用户服务协议》</span
        >
      </div>
      <div
        class="flex-center common-btn login-btn"
        :class="{
          active: isActive
        }"
        @click="handleLogin"
      >
        登录
      </div>
      <div class="flex-center-space-between">
        <span class="agreement-bar" @click="toPage('ForgetPasswordPage')"
          >忘记密码？</span
        >
        <span class="agreement-bar">注册</span>
      </div>
    </div>
    <div class="flex-center wx-icon">
      <svg-icon name="wx" />
    </div>
    <div class="flex-center">微信登录</div>
    <div class="placeholder-bar"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import FkPassword from './components/password.vue'
import { showToast } from 'vant'
import {
  validatePhone,
  validatePassword,
  handleFormatPhone
} from '@/utils/form'
import Loading from '@/components/loading'
import { delay } from '@/utils/util'
defineOptions({
  name: 'LoginPage'
})
const router = useRouter()
const phone = ref('')
const password = ref('')
const isAgree = ref(false)
const isActive = computed(() => {
  return phone.value && password.value
})

// 跳转页面
const toPage = (name: string) => {
  router.push({ name })
}
async function handleLogin() {
  if (!isActive.value) return
  if (!validatePhone(phone.value)) {
    return showToast('请输入正确的手机号')
  }
  if (password.value.length < 6 || password.value.length > 18) {
    return showToast('密码长度必须为6-18位')
  }
  if (!validatePassword(password.value)) {
    return showToast('密码只能包含字母、数字和特殊符号')
  }
  if (!isAgree.value) {
    return showToast('请先阅读并同意隐私政策及用户协议')
  }
  Loading.show()
  await delay()
  Loading.hide()
  router.back()
}
</script>
<style lang="less" scoped>
@import './common.less';
.login-wrap {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(#fef5ee, #fff 30%);
}
.login-logo {
  padding: 128px 64px 88px;
  img {
    width: 360px;
  }
}
.login-box {
  margin: 0 64px;
}

.password-item {
  margin-bottom: 68px;
}

:deep(.van-checkbox__icon) {
  --van-checkbox-size: 28px;
  --van-checkbox-checked-icon-color: #fe7000;
}
.agreement-wrap {
  flex-wrap: wrap;
  line-height: 38px;
}
.agreement-bar {
  color: #fe7000;
}
.login-btn {
  margin: 26px 0 32px;
}
.wx-icon {
  margin: 218px 0 16px;
  font-size: 88px;
  color: #05b058;
}
.placeholder-bar {
  height: 68px;
}
</style>
