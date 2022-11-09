import { createContext, ReactNode, useEffect, useState } from 'react'

type TabProps = {
  title: string
}

type TabsContextProps = {
  tabs: TabProps[]
  activeTab: number
  setActiveTab: (tabIndex: number) => void
  handleCloseTab: (tabIndex: number) => void
  handleAddNewTab: () => void
}

export const TabsContext = createContext({} as TabsContextProps)

type TabsProviderProps = {
  children: ReactNode
}

export const TabsProvider = ({ children }: TabsProviderProps) => {
  const [activeTab, setActiveTab] = useState(-1)
  const [tabs, setTabs] = useState<TabProps[]>([])

  const handleCloseTab = (tabIndex: number) => {
    setTabs(prevTabs => prevTabs.filter((tab, index) => tabIndex !== index))
    if (activeTab >= tabs.length - 1)
      setActiveTab(prevActiveTab => prevActiveTab - 1)
    localStorage.removeItem(`@form-tab=${activeTab}`)
  }

  const handleAddNewTab = () => {
    if (tabs.length === 0) setActiveTab(0)
    setTabs(prevTabs => [
      ...prevTabs,
      { title: `Agendamento ${prevTabs.length + 1}` },
    ])
  }

  const recreateTabs = () => {
    const storageTabs = Object.keys(localStorage).filter(key =>
      key.includes('@form-tab')
    )
    if (storageTabs.length <= 0) return
    setTabs(
      storageTabs.map((_, index) => ({ title: `Agendamento ${index + 1}` }))
    )
    setActiveTab(0)
  }

  useEffect(() => {
    recreateTabs()
  }, [])

  return (
    <TabsContext.Provider
      value={{ handleCloseTab, handleAddNewTab, activeTab, tabs, setActiveTab }}
    >
      {children}
    </TabsContext.Provider>
  )
}
