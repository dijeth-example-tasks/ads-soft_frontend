import type { FindRequestBody, RecordModel } from '@/types'
import { httpClient } from './httpClient/httpClient'

export interface ApiResponse<T> {
  data?: T
  error?: any
}

export type ApiFunction<T> = () => Promise<ApiResponse<T>>

const request = async <T>(
  method: 'get' | 'post',
  path: string,
  body?: any,
): Promise<ApiResponse<T>> => {
  try {
    const response = await httpClient[method](path, body)
    return { data: response.data }
  } catch (error) {
    return { error }
  }
}

export const match = async (body: FindRequestBody): Promise<ApiResponse<RecordModel[]>> => {
  // Just to simulate a long network response
  await new Promise((res) => setTimeout(res, 1000))

  return request('post', '/match', body)
}

export const getRecord = async (id: number): Promise<ApiResponse<RecordModel>> => {
  // Just to simulate a long network response
  await new Promise((res) => setTimeout(res, 1000))

  return request('get', `/records/${id}`)
}
