import { Sidebar } from '@/components/Sidebar'
import { TabsProvider } from '@/contexts/tabs'
import { Box, useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'

export const Root = () => {
  const isTabletSize = useMediaQuery('(max-width: 900px)')
  const drawerWidth = isTabletSize ? 60 : 200
  return (
    <TabsProvider>
      <Sidebar drawerWidth={drawerWidth} isTabletSize={isTabletSize} />
      <Box sx={{ pl: `${drawerWidth}px`, transition: 'all ease 500ms' }}>
        <Outlet />
      </Box>
    </TabsProvider>
  )
}
