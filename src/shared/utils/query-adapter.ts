import type { Response } from '@/shared/types/response'

export const queryAdapter = async <T>(
  promise: Promise<Response<T>>
): Promise<T> => {
  const response = await promise
  if (response.isError()) throw response.value
  return response.value
}
