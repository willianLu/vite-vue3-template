<template>
  <PageContainer>
    <template #header>
      <PageNav title="修改密码"></PageNav>
    </template>
    <div class="sms-wrap">
      <FkPassword
        v-model="password"
        placeholder="请输入新密码"
        maxlength="20"
      />
      <FkPassword
        v-model="passwordAgain"
        class="password-again"
        placeholder="请再次输入密码"
        maxlength="20"
      />
      <div class="password-tip">提示：密码不少于6位，支持数字、字母和符号</div>
      <div
        class="flex-center common-btn"
        :class="{ active: isActive }"
        @click="handleSetPassword"
      >
        完成
      </div>
    </div>
  </PageContainer>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import PageContainer from '@/components/page/container.vue'
import PageNav from '@/components/page/nav.vue'
import FkPassword from './components/password.vue'
import { showToast, showSuccessToast } from 'vant'
import { delay } from '@/utils/util'
import Loading from '@/components/loading'
import { validatePassword } from '@/utils/form'
import { useRouter } from 'vue-router'

const router = useRouter()
const password = ref('')
const passwordAgain = ref('')

const isActive = computed(() => {
  return password.value.length && passwordAgain.value.length
})

async function handleSetPassword() {
  if (!isActive.value) return
  if (password.value.length < 6 || password.value.length > 18) {
    return showToast('密码长度必须为6-18位')
  }
  if (!validatePassword(password.value)) {
    return showToast('密码只能包含字母、数字和特殊符号')
  }
  if (password.value !== passwordAgain.value) {
    return showToast('两次密码输入不相同')
  }
  Loading.show()
  await delay()
  Loading.hide()
  showSuccessToast('密码修改成功')
  router.go(-3)
}
</script>
<style lang="less" scoped>
@import url('./common.less');
:deep(.van-field) {
  background-color: #fff;
}
.password-again {
  margin-bottom: 16px;
}
.sms-wrap {
  padding: 128px 64px;
}
.password-tip {
  margin-bottom: 128px;
  color: #999;
}
</style>
