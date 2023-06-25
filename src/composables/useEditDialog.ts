import type { Editable } from "@/api/type"
import { MessagePlugin, type CellData } from "tdesign-vue-next"
import { ref } from "vue"
import type { Ref } from 'vue'

export const useEditDialog = <T extends { id: string }, R>(api: Editable<R, T>, modelName: string) => {
  const showDialog = ref(false)
  const editData = <Ref<T | null>>ref(null)

  const onClickCreateButton = () => {
    showDialog.value = true
    editData.value = null
  }
  const onClickEditButton = (item: CellData<T>) => {
    showDialog.value = true
    editData.value = item.row
  }
  const onCloseDialog = () => {
    showDialog.value = false
    editData.value = null
  }

  const onConfirm = async (request: R, id?: string,) => {
    if (id) {
      await api.edit(id, request)
      MessagePlugin.success(`${modelName}修改成功`)
    } else {
      await api.create(request)
      MessagePlugin.success(`${modelName}创建成功`)
    }
    onCloseDialog()
  }

  return { showDialog, editData, onClickCreateButton, onClickEditButton, onCloseDialog, onConfirm }
}