<template>
  <t-header class="header">
    <div class="header-left">
      <t-button variant="text" @click="handleCollapse">
          <template #icon>
            <t-icon name="menu-unfold" v-if="!appStore.state.collapsed" />
            <t-icon name="menu-fold" v-if="appStore.state.collapsed" />
          </template>
      </t-button>
    </div>
    <div class="header-right">
      <t-dropdown :options="[{ content: '退出登录', value: 'logout' }]" @click="handleDropDownClick">
        <t-button variant="text">
          <template #icon><t-icon name="user"/></template>
          {{ userStore.state.currentUser?.nickname }}
        </t-button>
      </t-dropdown>
    </div>
  </t-header>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store';
import { useUserStore } from '@/store';
import type { DropdownOption } from 'tdesign-vue-next';
import { useRoute, useRouter } from 'vue-router';
const userStore = useUserStore()
const appStore = useAppStore()
const router = useRouter()
const route = useRoute()

/** 退出登录 */
const handleLogout = async () => {
  await appStore.logout()
  await router.replace(`/login?redirect=${route.fullPath}`)
}

const handleDropDownClick = async (dropwodnItem: DropdownOption) => {
  switch (dropwodnItem.value) {
    case 'logout':
      await handleLogout()
      break;
    default:
      throw new Error('未知的操作类型')
  }
}

/** 折叠或开启侧边栏 */
const handleCollapse = () => appStore.state.collapsed = !appStore.state.collapsed

</script>

<style lang="less" scoped>
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}
</style>