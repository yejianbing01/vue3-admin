<template>
  <t-aside :width="asideWidth">
    <t-menu :collapsed="appStore.state.collapsed">
      <t-menu-item value="0">
        <template #icon>
          <t-icon name="app" />
        </template>
        仪表盘
      </t-menu-item>
     </t-menu>
  </t-aside>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store';
import { computed } from 'vue';

const appStore = useAppStore()

const asideWidth = computed(() => appStore.state.collapsed ? '64px' : '232px')
</script>

<style lang="less" scoped>

</style>