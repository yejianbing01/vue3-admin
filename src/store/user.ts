import type { UserType } from "@/api/type";
import { getCurrentUser } from "@/api/user";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useUserStore = defineStore(
  'user',
  () => {
    const state = reactive<Record<'currentUser', UserType|null>>({
      currentUser: null
    })

    const fetchCurrentUser = async () => {
      state.currentUser = await getCurrentUser()
    }

    const reset = () => state.currentUser = null

    return { state, fetchCurrentUser, reset }
  },
  { persist: true }
)