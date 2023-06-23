import type { PermissionEnum } from "@/config/permission.config";
import { useUserStore } from "@/store";
import type { Directive } from "vue";

/** 判断当前用户是否有权限 */
const hasNoPermission = (value: PermissionEnum):Boolean => {
  return useUserStore().state.currentUser?.permissions.indexOf(value) === -1
}

/** 权限指令 */
export const permissionDirective: Directive<Element> = {
  mounted(el, { value }) {
    if (hasNoPermission(value)) {
      el.parentNode?.removeChild(el)
    }
  }
}