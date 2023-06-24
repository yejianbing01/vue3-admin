import type { Searchable } from "@/api/type"
import type { PaginationProps, PageInfo } from "tdesign-vue-next"
import { ref, reactive, onMounted, type Ref } from "vue"

export const useSearch = <T, K>(api: Searchable<T>, searchKey: K) => {
  const loading = ref(false)
  const error = ref(null)
  const data = <Ref<Array<T>>>ref([])
  const pagination = reactive<PaginationProps>({
    current: 1,
    pageSize: 10,
    total: 0
  })

  const fetchData = () => {
    loading.value = true
    api.list({
      page: pagination.current,
      size: pagination.pageSize,
      ...searchKey
    })
      .then(({ data:_data, paging }) => {
        data.value = _data
        pagination.current = paging.page
        pagination.pageSize = paging.size
        pagination.total = paging.total
      })
      .catch(err => error.value = err)
      .finally(() => {
        loading.value = false
      })
  }

  const onPageChange = (pageInfo: PageInfo) => {
    pagination.current = pageInfo.current
    pagination.pageSize = pageInfo.pageSize
    fetchData()
  }

  onMounted(fetchData)

  return { loading, error, data, pagination, fetchData, onPageChange }

}