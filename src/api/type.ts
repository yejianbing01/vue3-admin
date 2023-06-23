import type { PermissionEnum } from "@/config/permission.config"

export type TokenRequest = {
  username: string
  password: string
}

export type ErrorResponse = {
  code: number
  message: string
}

export type UserType = {
  username: string
  nickname: string
  roles: Array<string>
  permissions: Array<PermissionEnum>
}

export interface Pagination {
  page?: number,
  size?: number,
  total?: number
}

export interface UserFilter extends Pagination {
  name?: string
}

export type ListResult<T> = {
  paging: Pagination
  data: Array<T>
}
