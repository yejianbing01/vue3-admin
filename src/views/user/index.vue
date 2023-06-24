<template>
  <t-card class="container">
    <div class="action-area">
      <t-button v-permission="PermissionEnum.USER_LIST_CREATE">创建用户</t-button>
    </div>
    <div class="search-area">
      <t-input class="search-area-input" v-model="searchKey.name"></t-input>
      <t-button @click="fetchData">
        <template #icon>
          <t-icon name="search"/>
        </template>
      </t-button>
    </div>
    <t-table 
      rowKey="id" 
      :columns="columns" 
      :loading="loading" 
      :pagination="pagination" 
      :data="data"
      @page-change="onPageChange"
    />
  </t-card>
</template>

<script lang="ts" setup>
import type { BaseTableCol } from 'tdesign-vue-next';
import type { UserType } from '@/api/type';
import userApi from '@/api/user'
import { reactive } from 'vue';
import { PermissionEnum } from '@/config/permission.config';
import { useSearch } from '@/composables/useSearch'

const columns: BaseTableCol[] = [
  { colKey: 'id', title: 'ID' },
  { colKey: 'username', title: '用户名' },
  { colKey: 'nickname', title: '昵称' },
  { colKey: 'roles', title: '角色' },
  { colKey: 'operation', title: '操作' }
]

const searchKey = reactive({ name: '' })

const { loading, data, pagination,fetchData, onPageChange  } = useSearch<UserType, {name: string}>(userApi, searchKey)

</script>

<style lang="less" scoped>
.container{
  margin: 20px;
  .action-area {
    display: flex;
  }
  .search-area {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    &-input{
      width: 200px;
      margin-right: 10px;
    }
  }
}
</style>