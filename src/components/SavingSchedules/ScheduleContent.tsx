import {
  Stepper,
  Stack,
  Step,
  StepLabel,
  Container,
  Typography,
  Grid,
} from '@mui/material'

import { Scheduling } from '../../types/scheduling'

type ScheduleContentProps = {
  schedule: Scheduling
}

export const ScheduleAbstract = ({ schedule }: ScheduleContentProps) => {
  return (
    <Stack sx={{ px: 1 }}>
      <Stack direction='row' gap={2}>
        <Content title='Organização Miliar'>
          <Stack direction='row'>
            <Typography variant='body2'>
              {schedule.organization.name}
            </Typography>
          </Stack>
        </Content>
        <Content title='Representante Legal'>
          <Stack direction='row'>
            <Typography variant='body2'>
              {schedule.forwardingAgent.name}
            </Typography>
          </Stack>
        </Content>
      </Stack>
      <Content title='Interessados'>
        {schedule.interesteds.map((interested, index) => (
          <Grid
            key={interested.identifier}
            container
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderTopWidth: index > 0 ? 0 : 1,
            }}
          >
            <Grid item xs={6} sx={{ pl: 1 }}>
              <Typography variant='body2'>{interested.name}</Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ borderLeft: '1px solid', borderColor: 'divider', pl: 1 }}
            >
              <Typography variant='body2'>{interested.service}</Typography>
            </Grid>
          </Grid>
        ))}
      </Content>
    </Stack>
  )
}

type ContentProps = {
  children: React.ReactNode
  title: string
}

const Content = ({ children, title }: ContentProps) => {
  return (
    <Stack direction='column' sx={{ mb: 1 }}>
      <Typography variant='caption' fontWeight='bold' color='text.secondary'>
        {title}
      </Typography>
      <Stack>{children}</Stack>
    </Stack>
  )
}
