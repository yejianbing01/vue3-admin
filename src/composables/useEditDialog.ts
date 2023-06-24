import type { CellData } from "tdesign-vue-next"
import { ref } from "vue"
import type { Ref } from 'vue'

export const useEditDialog = <T>(defaultData: T) => {
  const showDialog = ref(false)
  const editData = <Ref<T>>ref(defaultData)

  const onClickCreateButton = () => showDialog.value = true
  const onClickEditButton = (item: CellData<T>) => {
    showDialog.value = true
    editData.value = item.row
  }
  const onCloseDialog = () => {
    showDialog.value = false
    editData.value = defaultData
  }

  return { showDialog, editData, onClickCreateButton, onClickEditButton, onCloseDialog }
}