import type { UserType } from "@/api/type";
import { getCurrentUser } from "@/api/user";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { usePermissionStore } from "./permission";

export const useUserStore = defineStore(
  'user',
  () => {
    const state = reactive<Record<'currentUser', UserType|null>>({
      currentUser: null
    })

    const fetchCurrentUser = async () => {
      state.currentUser = await getCurrentUser()
      //TODO 超级管理员机制
      usePermissionStore().generateRoute(state.currentUser.permissions)
    }

    const reset = () => state.currentUser = null

    return { state, fetchCurrentUser, reset }
  },
  { persist: true }
)