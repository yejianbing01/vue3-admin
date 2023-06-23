<template>
  <t-aside :width="asideWidth">
    <t-menu :collapsed="appStore.state.collapsed" :defaultValue="$route.name">
      <SidebarItem v-for="item in permissionStore.menuRoutes" :key="item.name" :item="item" />
     </t-menu>
  </t-aside>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store';
import { computed } from 'vue';
import SidebarItem from '@/components/SidebarItem.vue'
import { usePermissionStore } from '@/store/permission';
import { useRoute } from 'vue-router';

const appStore = useAppStore()
const permissionStore = usePermissionStore()

const route = useRoute()
console.log(route.path)

const asideWidth = computed(() => appStore.state.collapsed ? '64px' : '232px')
</script>

<style lang="less" scoped>

</style>