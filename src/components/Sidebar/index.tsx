import { Drawer, List, Stack } from '@mui/material'
import WatchIcon from '@mui/icons-material/Monitor'
import PageIcon from '@mui/icons-material/Pages'
import SettingsIcon from '@mui/icons-material/Settings'
import { SidebarMenuItem } from './SidebarItem'

type SidebarProps = {
  drawerWidth: number
  isTabletSize: boolean
}

export const Sidebar = ({ drawerWidth, isTabletSize }: SidebarProps) => {
  return (
    <Drawer
      variant='permanent'
      open
      sx={{
        display: 'block',
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
          transition: 'all ease 500ms',
        },
      }}
    >
      <Stack
        direction='column'
        justifyContent='space-between'
        height='100%'
        sx={{ overflowX: 'hidden' }}
      >
        <List>
          <SidebarMenuItem
            title='Criar Agendamento'
            to='/'
            icon={<PageIcon />}
            withLegend={!isTabletSize}
          />
          <SidebarMenuItem
            title='Monitorar Abertura'
            to='/watch-schedules'
            icon={<WatchIcon />}
            withLegend={!isTabletSize}
          />
        </List>
        <List>
          <SidebarMenuItem
            title='Configurações'
            to='/settings'
            icon={<SettingsIcon />}
            withLegend={!isTabletSize}
          />
        </List>
      </Stack>
    </Drawer>
  )
}
