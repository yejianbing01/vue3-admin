<template>
  <t-layout class="layout" >
    <t-aside>Aside</t-aside>
    <t-layout>
      <t-header>Header</t-header>
      <t-content>
        <router-view></router-view>
      </t-content>
      <t-footer>Footer</t-footer>
    </t-layout>
  </t-layout>
</template>

<script lang="ts" setup>


</script>

<style lang="less" scoped>
.layout{
  height: 100vh;
}
</style>