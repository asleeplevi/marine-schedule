import { Section } from './Section'
import {
  Typography,
  Stack,
  Box,
  IconButton,
  Button,
  CircularProgress,
} from '@mui/material'
import { Input } from '../Input'
import { Scheduling } from '@/types/scheduling'
import { useEffect, useState } from 'react'
import CachedIcon from '@mui/icons-material/Cached'
import { StatusProps } from '.'

type StartScheduleScrapperProps = {
  schedule: Scheduling
  activeStep: number
  status: StatusProps
  captcha: string
  creatingsScheduleStatus: string
  handlePreCreateSchedule: () => void
  handleRenewCaptcha: () => void
  handleSaveChanges: (scheduling: Scheduling, activeStep: number) => void
}

export const StartScheduleScrapper = ({
  schedule,
  handlePreCreateSchedule,
  handleSaveChanges,
  activeStep,
  status,
  captcha,
  handleRenewCaptcha,
  creatingsScheduleStatus,
}: StartScheduleScrapperProps) => {
  if (status === 'incomplete')
    return (
      <Section title='Verificação'>
        <Stack
          direction='row'
          gap={1}
          alignItems='end'
          justifyContent='center'
          py={2}
        >
          <Typography variant='body2'>
            Selecione uma data para o agendamento antes de continuar
          </Typography>
        </Stack>
      </Section>
    )

  if (creatingsScheduleStatus !== '')
    return (
      <Section title='Verificação'>
        <Stack direction='column' alignItems='center' pt={4} pb={8}>
          <Typography variant='body2'>{creatingsScheduleStatus}</Typography>
          <CircularProgress sx={{ mt: 3, color: 'text.primary' }} />
        </Stack>
      </Section>
    )

  if (
    status === 'completed' &&
    captcha === '' &&
    creatingsScheduleStatus === ''
  )
    return (
      <Section title='Verificação'>
        <Stack direction='column' alignItems='center' pt={4} pb={8}>
          <Typography variant='body2'>
            Ao clicar no botão abaixo o robô irá preencher os dados no site da
            marinha, e carregar o captcha.
          </Typography>
          <Button onClick={handlePreCreateSchedule}>Iniciar Agendamento</Button>
        </Stack>
      </Section>
    )

  return (
    <Section title='Verificação'>
      <Stack direction='row' gap={1} alignItems='end'>
        <Box
          sx={{
            width: 'auto',
            minWidth: 180,
            height: 100,
            bgcolor: 'divider',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            img: {
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            },
          }}
        >
          <IconButton
            size='small'
            onClick={handleRenewCaptcha}
            sx={{ position: 'absolute', right: 0, top: 0 }}
          >
            <CachedIcon />
          </IconButton>
          <img src={`data:image/png;base64, ${captcha}`} alt='Captcha' />
        </Box>
        <Input
          withFormik={false}
          name='Captcha'
          label='Captcha'
          sx={{ margin: 0 }}
          fullWidth={false}
          defaultValue={schedule.captcha || ''}
          onBlur={({ target }) =>
            handleSaveChanges(
              { ...schedule, captcha: target.value || '' },
              activeStep
            )
          }
        />
      </Stack>
    </Section>
  )
}
