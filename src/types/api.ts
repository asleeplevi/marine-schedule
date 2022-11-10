export type ApiResponseStatusProps = 'success' | 'error'
export type ApiResponseProps<T> = {
  status: ApiResponseStatusProps
  isCached: boolean
  data: T
}
