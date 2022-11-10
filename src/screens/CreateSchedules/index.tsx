import { NoTabsOpened } from '@/components/NoTabsOpened'
import { TabsBar } from '@/components/Tabs'
import { useScheduling } from '@/hooks/useScheduling'
import { CreateSchedulesForm } from './Form'

export const CreateSchedules = () => {
  const { tabs } = useScheduling()
  return (
    <div>
      <TabsBar />
      {tabs.length === 0 ? <NoTabsOpened /> : <CreateSchedulesForm />}
    </div>
  )
}
