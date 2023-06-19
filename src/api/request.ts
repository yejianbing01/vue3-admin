import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'
import type { ErrorResponse } from './type'
import { MessagePlugin } from 'tdesign-vue-next'
import { useAppStore } from '@/store'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const request: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 60 * 1000
})

const JWTPrefix = 'Bearer '

/** 请求拦截器 */
request.interceptors.request.use((config) => {
  const appStore = useAppStore()
  if (appStore.state.token && config.headers) {
    config.headers['Authorization'] = JWTPrefix + appStore.state.token
  }
  return config
})

/** 响应拦截器 */
request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  async (error: AxiosError<ErrorResponse>) => {
    if (error.response) {
      await MessagePlugin.warning(error.response.data.message)
    }
    if (error.response?.status === 401) {
      const appStore = useAppStore()
      await appStore.logout()
    }

    return Promise.reject(error)
  }
)