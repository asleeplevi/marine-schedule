import { Router, Route } from 'electron-router-dom'
import { CreateSchedules } from './screens'
import { Root } from './screens/Root'
import { Settings } from './screens/Settings'
import { join } from 'node:path'
import { WatchSchedule } from './screens/WatchSchedules'

const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST as string, 'index.html')

export const AppRoutes = () => {
  return (
    <Router
      main={
        <Route path='/' element={<Root />}>
          <Route path='/' element={<CreateSchedules />} />
          <Route path='/watch-schedules' element={<WatchSchedule />} />
          <Route path='/settings' element={<Settings />} />
        </Route>
      }
    />
  )
}
