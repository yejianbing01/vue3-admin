<template>
  <t-menu-item v-if="!item?.children" :value="item.name" :to="{name: item.name}">
    <template #icon>
      <t-icon :name="item?.meta.icon" />
    </template>
    {{item?.meta.title}}
  </t-menu-item>

  <t-submenu v-if="item?.children" :value="item.name" :title="item.meta.title">
    <template #icon>
      <t-icon :name="item.meta.icon" />
    </template>
    <SidebarItem v-for="subItem in item.children" :key="subItem.path" :item="subItem"/>
  </t-submenu>
</template>

<script lang="ts" setup>

defineProps({
  item: {
    type: Object,
    default: null
  }
})
</script>

<style lang="" scoped>

</style>