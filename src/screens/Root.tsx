import { Sidebar } from '@/components/Sidebar'
import { SchedulingProvider } from '@/contexts/schedules'
import { useTheme } from '@/hooks/useTheme'
import { theme } from '@/styles/themes'
import {
  ThemeProvider as MuiThemeProvider,
  Box,
  useMediaQuery,
} from '@mui/material'
import { Outlet } from 'react-router-dom'

export const Root = () => {
  const isTabletSize = useMediaQuery('(max-width: 1000px)')
  const { mode } = useTheme()
  const drawerWidth = isTabletSize ? 60 : 200
  return (
    <MuiThemeProvider theme={theme(mode)}>
      <SchedulingProvider>
        <Sidebar drawerWidth={drawerWidth} isTabletSize={isTabletSize} />
        <Box
          sx={{
            pl: `${drawerWidth}px`,
            transition: 'all ease 500ms',
            bgcolor: 'background.paper',
            minHeight: '100vh',
          }}
        >
          <Outlet />
        </Box>
      </SchedulingProvider>
    </MuiThemeProvider>
  )
}
