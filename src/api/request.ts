import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'
import type { ErrorResponse } from './type'
import { MessagePlugin } from 'tdesign-vue-next'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const request: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 60 * 1000
})

/** 响应拦截器 */
request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error: AxiosError<ErrorResponse>) => {
    error.response && MessagePlugin.warning(error.response.data.message)
    return Promise.reject(error)
  }
)