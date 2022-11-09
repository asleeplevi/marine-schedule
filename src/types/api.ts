export type ApiResponseStatusProps = 'success' | 'error'
export type ApiResponseProps<T = unknown> = {
  status: ApiResponseStatusProps
  isCached: boolean
  data: T
}
