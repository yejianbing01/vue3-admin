<template>
  <div class="login-container">
    <div class="content">
      <t-card>
        <h1>IdbI Admin</h1>
        <t-form ref="form" :data="formData" :rules="rules" :colon="true" :label-width="0" >
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
            <t-button theme="primary" type="submit" block>登录</t-button>
          </t-form-item>
        </t-form>
      </t-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormRules } from 'tdesign-vue-next/es/form/type';
import { reactive } from 'vue'

type FormData = {
  username: string
  password: string
}

const rules: FormRules<FormData> = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }]
}

const formData = reactive<FormData>({
  username: '',
  password: ''
})

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
  }
}

</style>