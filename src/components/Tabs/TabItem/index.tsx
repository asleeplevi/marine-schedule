import { Typography, Box, Stack, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { MouseEvent } from 'react'

type AppBarTabItemProps = {
  title: string
  activeTab: number
  index: number
  onChangeTab: (tabIndex: number) => void
  onClose: (tabIndex: number) => void
}

export const AppBarTabItem = ({
  title,
  activeTab,
  index,
  onChangeTab,
  onClose,
}: AppBarTabItemProps) => {
  const handleCloseTab = (event: MouseEvent) => {
    event.stopPropagation()
    onClose(index)
  }

  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      onClick={() => onChangeTab(index)}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        width: 180,
        height: 35,
        backgroundColor: '#fff',
        borderBottom: activeTab === index ? '#fff' : 'divider',
        position: 'relative',
        zIndex: 2,
        pt: 0.5,
        pl: 1,
        pr: 0.5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        userSelect: 'none',
      }}
    >
      <Typography variant='caption'>{title}</Typography>
      <IconButton size='small' onClick={handleCloseTab}>
        <CloseIcon sx={{ fontSize: 15 }} />
      </IconButton>
    </Stack>
  )
}
