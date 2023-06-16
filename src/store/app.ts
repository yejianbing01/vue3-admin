import { createToken } from "@/api/token";
import type { TokenRequest } from "@/api/type";
import { defineStore } from "pinia";
import { reactive } from "vue";

/** 全局状态 */
export const useAppStore = defineStore(
  'app',
  () => {
    const state = reactive({ token: '' })
    const login = async (tokenRequest: TokenRequest): Promise<void> => {
      state.token = await createToken(tokenRequest)
    }
    return {state, login}
  },
  { persist: true }
)