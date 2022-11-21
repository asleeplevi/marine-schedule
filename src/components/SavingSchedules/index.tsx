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
import { Section } from './Section'
import { StartScheduleScrapper } from './StartScheduleScrapper'

type SavingSchedulesProps = {
  open: boolean
  onClose: () => void
}

type LoadingOptionsProps = 'available-hours' | ''

export type StatusProps = 'incomplete' | 'completed' | 'ready-to-finish'

export const SavingSchedules = ({ open, onClose }: SavingSchedulesProps) => {
  const [activeStep, setActiveStep] = useState(0)
  const [captcha, setCaptcha] = useState('')
  const [status, setStatus] = useState<StatusProps>('incomplete')
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

  const handlePreCreateSchedule = async () => {
    console.log('[schedule]', schedule)
    const captchaImage = await window.electron.invoke('schedule', schedule)
    setCaptcha(captchaImage)
  }

  const handleRenewCaptcha = async () => {
    const captchaImage = await window.electron.invoke('renew-captcha')
    setCaptcha(captchaImage)
  }

  const handleSaveSchedule = async () => {
    await window.electron.invoke('fill-captcha', schedule.captcha)
    setActiveStep(prevStep => prevStep + 1)
    if (activeStep >= tabs.length) onClose()
  }

  useEffect(() => {
    if (!open) return
    getAvailableHours()
    setActiveStep(0)
  }, [open])

  useEffect(() => {
    if (status === 'incomplete') {
      if (schedule?.date) {
        setStatus('completed')
      }
    }
  }, [schedule])

  useEffect(() => {
    setStatus('incomplete')
    setAvailableHours([])
    getAvailableHours()
  }, [activeStep])
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
            <StartScheduleScrapper
              activeStep={activeStep}
              handleRenewCaptcha={handleRenewCaptcha}
              handlePreCreateSchedule={handlePreCreateSchedule}
              handleSaveChanges={(...args) => {
                if (String(args[0]?.captcha).length >= 4) {
                  setStatus('ready-to-finish')
                }
                handleSaveChanges(...args)
              }}
              schedule={schedule}
              status={status}
              captcha={captcha}
            />
          </Stack>
          <Stack direction='row' justifyContent='flex-end'>
            <Button
              variant='contained'
              disableElevation
              disabled={status !== 'ready-to-finish'}
              onClick={handleSaveSchedule}
            >
              Confirmar Agendamento {activeStep + 1}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Modal>
  )
}
