import { NoTabsOpened } from '@/components/NoTabsOpened'
import { TabsBar } from '@/components/Tabs'
import { useTabs } from '@/hooks/useTabs'

export const CreateSchedules = () => {
  const { tabs } = useTabs()
  return (
    <div>
      <TabsBar />
      {tabs.length === 0 ? <NoTabsOpened /> : <p>create schedules</p>}
    </div>
  )
}
