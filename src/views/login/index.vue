<template>
  <div class="login-container">
    <div class="content">
      <t-card>
        <h1>IdbI Admin</h1>
        <t-form 
          ref="form" 
          class="login-form" 
          :data="formData" 
          :rules="rules" 
          :colon="true" 
          :label-width="0" 
          @submit="handleLogin" 
        >
          <t-form-item name="username">
            <t-input v-model="formData.username" clearable placeholder="请输入用户名">
              <template #prefix-icon>
                <icon name="desktop"/>
              </template>
            </t-input>
          </t-form-item>
          <t-form-item name="password">
            <t-input v-model="formData.password" type="password" clearable placeholder="请输入密码">
              <template #prefix-icon>
                <icon name="lock-on"/>
              </template>
            </t-input>
          </t-form-item>
          <t-form-item>
            <t-button theme="primary" type="submit" :loading="loading" block>登录</t-button>
          </t-form-item>
        </t-form>
      </t-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TokenRequest } from '@/api/type';
import { useAppStore } from '@/store/app';
import type { FormRules, SubmitContext } from 'tdesign-vue-next/es/form/type';
import MessagePlugin from 'tdesign-vue-next/es/message/plugin';
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
const appStore = useAppStore()
const router = useRouter()

const rules: FormRules<TokenRequest> = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }]
}

const loading = ref(false)
const formData = reactive<TokenRequest>({
  username: 'admin',
  password: 'admin123'
})

/** 登录 */
const handleLogin = async ({ validateResult }: SubmitContext) => {
  if (validateResult !== true) return
  loading.value = true
  try {
    await appStore.login(formData)
    MessagePlugin.success('登录成功')
    router.push('/dashboard')
  } finally {
    loading.value = false
  }
}


</script>

<style lang="less" scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    width: 400px;
    h1 {
      text-align: center;
    }
    .login-form {
      margin-bottom: 20px;
    }
  }
}

</style>