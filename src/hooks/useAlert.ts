import { AlertContext } from '@/contexts/alert'
import { useContext } from 'react'

export function useAlert() {
  return useContext(AlertContext)
}
