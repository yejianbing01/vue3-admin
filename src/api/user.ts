import { request } from "./request"
import type { UserType } from "./type"

/** 获取当前用户信息 */
export const getCurrentUser = (): Promise<UserType> => {
  return request.get('/users/me')
}