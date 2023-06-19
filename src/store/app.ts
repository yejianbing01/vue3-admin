import { createToken } from "@/api/token";
import type { TokenRequest } from "@/api/type";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { useUserStore } from "./user";

/** 全局状态 */
export const useAppStore = defineStore(
  'app',
  () => {
    const userStore = useUserStore()
    const state = reactive({ token: '', collapsed: false })
    
    const login = async (tokenRequest: TokenRequest): Promise<void> => {
      state.token = await createToken(tokenRequest)
      await userStore.fetchCurrentUser()
    }

    const logout = async () => {
      state.token = ''
      userStore.reset()
    }

    return { state, login, logout }
  },
  { persist: true }
)