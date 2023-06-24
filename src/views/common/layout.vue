<template>
  <t-layout class="layout" >
    <Aside />
    <t-layout>
      <Header>Header</Header>
      <t-content class="content">
        <router-view></router-view>
      </t-content>
      <t-footer>Footer</t-footer>
    </t-layout>
  </t-layout>
</template>

<script lang="ts" setup>
import Header from './header.vue'
import Aside from './aside.vue'


</script>

<style lang="less" scoped>
.layout{
  height: 100vh;
  .content{
    overflow-y: auto;
  }
}
</style>