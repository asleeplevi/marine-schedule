import { ApiResponseProps } from '@/types/api'

const base64Image =

export function getCaptcha(): ApiResponseProps<string> {
  return {
    data: base64Image,
    status: 'success',
    isCached: false,
  }
}