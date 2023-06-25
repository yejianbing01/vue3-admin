import { request } from "./request"
import type { ListResult, UserCreateRequest, UserFilter, UserType } from "./type"

/** 获取当前用户信息 */
const getCurrentUser = (): Promise<UserType> => {
  return request.get('/users/me')
}

/** 查询用户列表 */
const list = (filter?: UserFilter): Promise<ListResult<UserType>> => {
  return request.get('/users', { params: filter })
}

const create = (userCreateRequest: UserCreateRequest): Promise<UserType> => {
  return request.post('/users', userCreateRequest)
}

const edit = (id: string, userCreateRequest: UserCreateRequest): Promise<UserType> => {
  return request.post(`/users/${id}`, userCreateRequest)
}


export default {
  getCurrentUser,
  list,
  create,
  edit
}