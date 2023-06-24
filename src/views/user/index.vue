<template>
  <t-card class="container">
    <div class="action-area">
      <t-button v-permission="PermissionEnum.USER_LIST_CREATE" @click="onClickCreateButton">创建用户</t-button>
    </div>
    <div class="search-area">
      <t-input class="search-area-input" v-model="searchKey.name"></t-input>
      <t-button v-permission="PermissionEnum.USER_LIST_EDIT" @click="fetchData">
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
    >
      <template #operation="item">
        <t-button @click="onClickEditButton(item)">
          编辑
          <template #icon>
            <t-icon name="edit"/>
          </template>
        </t-button>
      </template>
    </t-table>
  </t-card>
  <EditDialog :visible="showDialog" :data="editData" @close="onCloseDialog"/>
</template>

<script lang="ts" setup>
import type { BaseTableCol } from 'tdesign-vue-next';
import type { UserType } from '@/api/type';
import userApi from '@/api/user'
import { reactive } from 'vue';
import { PermissionEnum } from '@/config/permission.config'
import { useSearch } from '@/composables/useSearch'
import { useEditDialog } from '@/composables/useEditDialog'
import EditDialog from '@/components/EditDialog.vue'

const columns: BaseTableCol[] = [
  { colKey: 'id', title: 'ID' },
  { colKey: 'username', title: '用户名' },
  { colKey: 'nickname', title: '昵称' },
  { colKey: 'roles', title: '角色' },
  { colKey: 'operation', title: '操作' }
]

const searchKey = reactive({ name: '' })
const { loading, data, pagination,fetchData, onPageChange  } = useSearch<UserType, {name: string}>(userApi, searchKey)

const defaultEditData: UserType = {
  id: '',
  username: '',
  nickname: '',
  roles: [],
  permissions: []
}
const { showDialog, editData, onClickCreateButton, onClickEditButton, onCloseDialog } = useEditDialog<UserType>(defaultEditData)

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