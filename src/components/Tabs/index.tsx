import { Stack, IconButton, Box, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { AppBarTabItem } from './TabItem'
import { useTabs } from '../../hooks/useTabs'

type TabsBarProps = {}

export const TabsBar = ({}: TabsBarProps) => {
  const { tabs, activeTab, handleAddNewTab, handleCloseTab, setActiveTab } =
    useTabs()

  return (
    <Box sx={{ position: 'relative', height: 40 }}>
      <Box
        sx={{
          width: '100%',
          height: '1px',
          backgroundColor: 'divider',
          position: 'absolute',
          bottom: 0,
          zIndex: 1,
        }}
      />
      <Stack direction='row' height='100%' alignItems='flex-end' ml={2}>
        {tabs.map((tab, index) => (
          <AppBarTabItem
            key={index}
            index={index}
            activeTab={activeTab}
            title={tab.title}
            onChangeTab={newTab => setActiveTab(newTab)}
            onClose={tabIndex => handleCloseTab(tabIndex)}
          />
        ))}
        <Tooltip title='Nova aba'>
          <IconButton
            size='small'
            sx={{ ml: 1, mb: '5px' }}
            onClick={handleAddNewTab}
          >
            <AddIcon sx={{ fontSize: 15 }} />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  )
}
