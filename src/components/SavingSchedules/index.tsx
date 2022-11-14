import { Modal } from '../Modal'
import { useScheduling } from '@/hooks/useScheduling'
import {
  Stepper,
  Stack,
  Step,
  StepLabel,
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  IconButton,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { ScheduleAbstract } from './ScheduleContent'
import { Calendar } from '../Calendar'
import { Input } from '../Input'
import { GetAvailableSchedulesResponseProps } from '@/ipc/functions/getAvailableScheduling'
import { useLoading } from '@/hooks/useLoading'
import CachedIcon from '@mui/icons-material/Cached'

type SavingSchedulesProps = {
  open: boolean
  onClose: () => void
}

type LoadingOptionsProps = 'available-hours' | ''

export const SavingSchedules = ({ open, onClose }: SavingSchedulesProps) => {
  const [activeStep, setActiveStep] = useState(0)
  const [captcha, setCaptcha] = useState('')
  const { tabs, handleSaveChanges } = useScheduling()

  const { isLoading, setLoading } = useLoading<LoadingOptionsProps>()

  const [availableHours, setAvailableHours] = useState<
    GetAvailableSchedulesResponseProps[]
  >([])

  const schedule = tabs[activeStep]

  async function getAvailableHours(date?: string) {
    setLoading('available-hours')
    try {
      const { data } = await window.api.get.availableSchedules({
        date,
        nidom: schedule.organization.nidom,
        identifier: schedule.forwardingAgent.identifier,
        interesteds: schedule.interesteds,
      })
      setAvailableHours(data)
    } catch (error) {
    } finally {
      setLoading('available-hours', true)
    }
  }

  const onChangeMonth = (newDate: string) => {
    getAvailableHours(newDate)
  }

  const onChangeDate = (date: Date) => {
    handleSaveChanges({ ...schedule, date }, activeStep)
  }

  const getCaptcha = async () => {
    const { data } = window.api.get.captcha()

    setCaptcha(data)
  }

  useEffect(() => {
    if (!open) return
    getAvailableHours()
  }, [open])

  if (!schedule) return <div />
  return (
    <Modal open={open} onClose={onClose}>
      <Container sx={{ p: 2 }} maxWidth='lg'>
        <Stack direction='column' display='flex' height='100%'>
          <Stepper activeStep={activeStep} sx={{ mb: 2, pr: 2 }}>
            {tabs.map((tab, index) => (
              <Step key={index}>
                <StepLabel>Agendamento {index + 1}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Stack>
            <Section title='Resumo'>
              <ScheduleAbstract schedule={schedule} />
            </Section>
            <Section title='Selecionar data e hora para atendimento'>
              {isLoading('available-hours') ? (
                <Stack
                  width='100%'
                  height='100%'
                  justifyContent='center'
                  alignItems='center'
                  position='absolute'
                  left={0}
                  top={0}
                  bgcolor='#00000050'
                >
                  <CircularProgress color='inherit' />
                </Stack>
              ) : null}
              <Calendar
                availableDays={availableHours}
                onChangeMonth={onChangeMonth}
                onChangeDate={onChangeDate}
                defaultValue={schedule?.date}
              />
            </Section>
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
                    img: {
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    },
                  }}
                >
                  {captcha ? (
                    <img
                      src={`data:image/png;base64, ${captcha}`}
                      alt='Captcha'
                    />
                  ) : (
                    <IconButton>
                      <CachedIcon />
                    </IconButton>
                  )}
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
          </Stack>
          <Stack direction='row' justifyContent='flex-end'>
            <Button variant='contained' disableElevation>
              Confirmar Agendamento {activeStep + 1}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Modal>
  )
}

type SectionProps = {
  title: string
  children: React.ReactNode
}

const Section = ({ title, children }: SectionProps) => {
  return (
    <Box sx={{ mb: 1, position: 'relative' }}>
      <Typography
        variant='body2'
        fontWeight='bold'
        color='text.secondary'
        sx={{ my: 0.5 }}
      >
        {title}
      </Typography>
      <Stack sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 1 }}>
        {children}
      </Stack>
    </Box>
  )
}
