import { useContext } from 'react'
import { TabsContext } from '../contexts/tabs'

export function useTabs() {
  return useContext(TabsContext)
}
