<template>
  <t-card class="container">
    <div class="action-area">
      <t-button v-permission="PermissionEnum.USER_LIST_CREATE">创建用户</t-button>
    </div>
    <div class="search-area">
      <t-input class="search-area-input" v-model="searchKey.name"></t-input>
      <t-button @click="fetchUserList">
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
      :data="tableData"
      @page-change="onPageChange"
    />
  </t-card>
</template>

<script lang="ts" setup>
import type { UserType } from '@/api/type';
import type { BaseTableCol, PageInfo, PaginationProps } from 'tdesign-vue-next';
import { onMounted, reactive, ref } from 'vue';
import { PermissionEnum } from '@/config/permission.config';
import userApi from '@/api/user'


const columns: BaseTableCol[] = [
  { colKey: 'id', title: 'ID' },
  { colKey: 'username', title: '用户名' },
  { colKey: 'nickname', title: '昵称' },
  { colKey: 'roles', title: '角色' },
  { colKey: 'operation', title: '操作' }
]

const loading = ref(false)
const tableData = ref<UserType[]>([])
const pagination = reactive<PaginationProps>({
  current: 1,
  pageSize: 10,
  total: 0
})
const searchKey = reactive({
  name: ''
})

const fetchUserList = () => {
  loading.value = true
  userApi.list({
    page: pagination.current,
    size: pagination.pageSize,
    name: searchKey.name
  })
    .then(({ data, paging }) => {
      tableData.value = data
      pagination.current = paging.page
      pagination.pageSize = paging.size
      pagination.total = paging.total
    })
    .finally(() => {
      loading.value = false
    })
}

const onPageChange = (pageInfo: PageInfo) => {
  pagination.current = pageInfo.current
  pagination.pageSize = pageInfo.pageSize
  fetchUserList()
}

onMounted(fetchUserList)

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