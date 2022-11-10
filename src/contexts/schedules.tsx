import { Scheduling } from '@/types/scheduling'
import { createContext, ReactNode, useEffect, useState } from 'react'

type SchedulingContextProps = {
  tabs: Scheduling[]
  activeTab: number
  setActiveTab: (tabIndex: number) => void
  handleCloseTab: (tabIndex: number) => void
  handleAddNewTab: () => void
  handleSaveChanges: (newSchedule: Scheduling, index: number) => void
}

export const SchedulingContext = createContext({} as SchedulingContextProps)

type SchedulingProviderProps = {
  children: ReactNode
}

export const SchedulingProvider = ({ children }: SchedulingProviderProps) => {
  const [activeTab, setActiveTab] = useState(-1)
  const [tabs, setTabs] = useState<Scheduling[]>([])

  const handleCloseTab = (tabIndex: number) => {
    setTabs(prevTabs => prevTabs.filter((tab, index) => tabIndex !== index))
    if (activeTab >= tabs.length - 1)
      setActiveTab(prevActiveTab => prevActiveTab - 1)
    // localStorage.removeItem(`@form-tab=${activeTab}`)
  }

  const handleAddNewTab = () => {
    const emptyScheduling: Scheduling = {
      forwardingAgent: {
        identifier: '',
        name: '',
      },
      interesteds: [],
      organization: {
        name: '',
        nidom: '',
      },
    }
    if (tabs.length === 0) setActiveTab(0)
    setTabs(prevTabs => [...prevTabs, emptyScheduling])
  }

  const recreateTabs = () => {
    const storageSchedules = window.localStorage.getItem('schedules')
    if (storageSchedules) {
      setTabs(JSON.parse(storageSchedules))
      setActiveTab(0)
    }
  }

  const handleSaveChanges = (scheduling: Scheduling, index: number) => {
    const updatesSchedules = tabs.slice(0)
    updatesSchedules.splice(index, 1, scheduling)
    setTabs(updatesSchedules)
    window.localStorage.setItem('schedules', JSON.stringify(updatesSchedules))
  }

  useEffect(() => {
    recreateTabs()
  }, [])

  return (
    <SchedulingContext.Provider
      value={{
        handleCloseTab,
        handleAddNewTab,
        activeTab,
        tabs,
        setActiveTab,
        handleSaveChanges,
      }}
    >
      {children}
    </SchedulingContext.Provider>
  )
}
