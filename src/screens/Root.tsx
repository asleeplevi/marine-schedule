import { Sidebar } from '@/components/Sidebar'
import { SchedulingProvider } from '@/contexts/schedules'
import { Box, useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'

export const Root = () => {
  const isTabletSize = useMediaQuery('(max-width: 1000px)')
  const drawerWidth = isTabletSize ? 60 : 200
  return (
    <SchedulingProvider>
      <Sidebar drawerWidth={drawerWidth} isTabletSize={isTabletSize} />
      <Box sx={{ pl: `${drawerWidth}px`, transition: 'all ease 500ms' }}>
        <Outlet />
      </Box>
    </SchedulingProvider>
  )
}
