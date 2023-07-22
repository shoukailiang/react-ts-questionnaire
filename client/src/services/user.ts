import axios, { DataType } from './axios'

// 获取用户信息
export async function getUserInfoService(): Promise<DataType> {
  const url = `/api/user/info`
  const data = (await axios.get(url)) as DataType
  return data
}

// 注册用户
export async function registerService(
  username: string,
  password: string,
  nickname?: string
): Promise<DataType> {
  const url = `/api/user/register`
  const data = (await axios.post(url, {
    username,
    password,
    nickname: nickname || ''
  })) as DataType
  return data
}

// 用户登陆
export async function loginService(
  username: string,
  password: string
): Promise<DataType> {
  const url = `/api/user/login`
  const data = (await axios.post(url, {
    username,
    password
  })) as DataType
  return data
}
