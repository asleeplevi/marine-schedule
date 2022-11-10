import { useContext } from 'react'
import { SchedulingContext } from '../contexts/schedules'

export function useScheduling() {
  return useContext(SchedulingContext)
}
