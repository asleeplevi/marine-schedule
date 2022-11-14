import { Link, Card, Container, Stack, Typography } from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox'
import { useScheduling } from '@/hooks/useScheduling'

export const NoTabsOpened = () => {
  const { handleAddNewTab } = useScheduling()
  return (
    <Container sx={{ pt: 2 }} maxWidth='md'>
      <Card variant='outlined'>
        <Stack
          width='60%'
          minWidth={300}
          height={300}
          justifyContent='center'
          alignItems='center'
          m='auto'
          color='text.secondary'
        >
          <InboxIcon sx={{ fontSize: 30, mb: 1 }} />
          <Typography variant='h6' fontWeight='bold' sx={{ mb: 1 }}>
            Nada por aqui
          </Typography>
          <Typography variant='body2' textAlign='center'>
            Nenhuma aba está aberta ou foi encontrada armazenada, para iniciar
            um novo agendamento{' '}
            <Link sx={{ cursor: 'pointer' }} onClick={handleAddNewTab}>
              clique aqui
            </Link>
          </Typography>
        </Stack>
      </Card>
    </Container>
  )
}
