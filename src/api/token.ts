import type { TokenRequest } from "./type";
import { request } from "./request";

/** 登录获取token */
export const createToken = (tokenRequest: TokenRequest): Promise<string> => {
  return request.post('/tokens', tokenRequest)
}