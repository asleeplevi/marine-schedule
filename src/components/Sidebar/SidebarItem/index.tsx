import { ListItem, Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type SidebarMenuItemProps = {
  to: string
  title: string
  icon: ReactNode
  withLegend: boolean
}

export const SidebarMenuItem = ({
  icon,
  title,
  to,
  withLegend,
}: SidebarMenuItemProps) => {
  const navigate = useNavigate()

  const navigation = useLocation()

  const isCurrentPage = navigation.pathname === to

  return (
    <ListItem button onClick={() => navigate(to)}>
      <Stack
        direction='row'
        gap={1}
        alignItems='center'
        sx={{
          color: isCurrentPage ? 'primary.main' : 'text.secondary',
          whiteSpace: 'nowrap',
        }}
      >
        {icon}
        {withLegend ? <Typography variant='body2'>{title}</Typography> : null}
      </Stack>
    </ListItem>
  )
}
