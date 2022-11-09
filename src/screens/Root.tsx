import { Sidebar } from '@/components/Sidebar'
import { Box, useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'

export const Root = () => {
  const isTabletSize = useMediaQuery('(max-width: 900px)')
  const drawerWidth = isTabletSize ? 60 : 200
  return (
    <>
      <Sidebar drawerWidth={drawerWidth} isTabletSize={isTabletSize} />
      <Box sx={{ pl: `${drawerWidth}px`, transition: 'all ease 500ms' }}>
        <Outlet />
      </Box>
    </>
  )
}
