import { Scheduling } from '@/types/scheduling'
import { createContext, ReactNode, useEffect, useState } from 'react'

type SchedulingContextProps = {
  tabs: Scheduling[]
  activeTab: number
  setActiveTab: (tabIndex: number) => void
  handleCloseTab: (tabIndex: number) => void
  handleAddNewTab: () => void
  handleSaveChanges: (newSchedule: Scheduling, index: number) => void
  handleSaveSchedules: () => void
}

export const SchedulingContext = createContext({} as SchedulingContextProps)

type SchedulingProviderProps = {
  children: ReactNode
}

export const SchedulingProvider = ({ children }: SchedulingProviderProps) => {
  const [activeTab, setActiveTab] = useState(-1)
  const [tabs, setTabs] = useState<Scheduling[]>([])

  const handleCloseTab = (tabIndex: number) => {
    const newTabs = tabs.slice(0)
    newTabs.splice(tabIndex, 1)
    setTabs(newTabs)
    if (activeTab >= tabs.length - 1)
      setActiveTab(prevActiveTab => prevActiveTab - 1)
    localStorage.setItem('schedules', JSON.stringify(newTabs))
  }

  const handleAddNewTab = () => {
    const emptyScheduling = {
      interesteds: [],
      forwardingAgent: {
        identifier: '',
        name: '',
      },
      organization: {
        name: '',
        nidom: '',
      },
    } as Scheduling
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

  async function getForwardingAgentName(scheduling: Scheduling) {
    const identifier = scheduling.forwardingAgent?.identifier
    const nidom = scheduling?.organization?.nidom

    if (!nidom || !identifier) return

    const { data } = await window.api.get.forwardingAgent({
      identifier: identifier,
      nidom: nidom,
      validarAtivo: true,
      prefetch: true,
    })

    return data.name
  }

  const handleSaveChanges = async (scheduling: Scheduling, index: number) => {
    const updatesSchedules = tabs.slice(0)

    const agentName = await getForwardingAgentName(scheduling)
    const updatedScheduling = {
      ...scheduling,
      forwardingAgent: {
        ...scheduling.forwardingAgent,
        name: agentName || '',
      },
    }
    updatesSchedules.splice(index, 1, updatedScheduling)
    setTabs(updatesSchedules)
    window.localStorage.setItem('schedules', JSON.stringify(updatesSchedules))
  }

  const handleSaveSchedules = () => {
    console.log(tabs)
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
        handleSaveSchedules,
      }}
    >
      {children}
    </SchedulingContext.Provider>
  )
}
