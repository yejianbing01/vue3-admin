import { request } from "./request"
import type { ListResult, UserFilter, UserType } from "./type"

/** 获取当前用户信息 */
export const getCurrentUser = (): Promise<UserType> => {
  return request.get('/users/me')
}

/** 查询用户列表 */
export const list = (filter?: UserFilter): Promise<ListResult<UserType>> => {
  return request.get('/users', { params: filter })
}


export default {
  getCurrentUser,
  list
}