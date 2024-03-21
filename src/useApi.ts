import { ref, type Ref } from 'vue'
import type { ApiResponse } from '@/api/api'

export type TApiFunction<T> = (...args: any[]) => Promise<ApiResponse<T>>
export type TApiReturn<T> = {
  isLoading: Ref<boolean>
  result: Ref<T | undefined>
  error: Ref<any>
  request: TApiFunction<T>
}

export function useApi<T>(apiFunction: TApiFunction<T>): TApiReturn<T> {
  const result = ref<T>()
  const error = ref<any>()
  const isLoading = ref<boolean>(false)

  const request = async (...args: any[]) => {
    isLoading.value = true
    result.value = undefined
    error.value = undefined

    const response = await apiFunction(...args)
    if (response.error) {
      error.value = response.error
    } else {
      result.value = response.data
    }
    isLoading.value = false

    return response
  }

  return {
    request,
    result,
    error,
    isLoading,
  }
}
