import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import { CreateSchedules } from './screens'
import { Root } from './screens/Root'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route path='/' element={<CreateSchedules />} />
      <Route path='/watch-schedules' element={<CreateSchedules />} />
    </Route>
  )
)
