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
} from '@mui/material'
import { useEffect, useState } from 'react'
import { ScheduleAbstract } from './ScheduleContent'
import { Calendar } from '../Calendar'
import { Input } from '../Input'
import { GetAvailableSchedulesResponseProps } from '@/ipc/functions/getAvailableScheduling'

type SavingSchedulesProps = {
  open: boolean
  onClose: () => void
}

export const SavingSchedules = ({ open, onClose }: SavingSchedulesProps) => {
  const [activeStep, setActiveStep] = useState(0)
  const { tabs, handleSaveChanges } = useScheduling()

  const [availableHours, setAvailableHours] = useState<
    GetAvailableSchedulesResponseProps[]
  >([])

  const schedule = tabs[activeStep]

  async function getAvailableHours(date?: string) {
    const { data } = await window.api.get.getAvailableSchedules(date as string)
    setAvailableHours(data)
  }

  const onChangeMonth = (newDate: string) => {
    getAvailableHours(newDate)
  }

  const onChangeDate = (date: Date) => {
    handleSaveChanges({ ...schedule, date }, activeStep)
  }

  useEffect(() => {
    getAvailableHours()
  }, [])

  if (!schedule) return <p>123</p>
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
              <Calendar
                availableDays={availableHours}
                onChangeMonth={onChangeMonth}
                onChangeDate={onChangeDate}
                defaultValue={schedule?.date}
              />
            </Section>
            <Section title='Verificação'>
              <Stack direction='row' gap={1} alignItems='end'>
                <Box sx={{ width: 200, height: 100, bgcolor: 'divider' }} />
                <Input
                  withFormik={false}
                  name='Captcha'
                  label='Captcha'
                  sx={{ margin: 0 }}
                  fullWidth={false}
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
    <Box sx={{ mb: 1 }}>
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
