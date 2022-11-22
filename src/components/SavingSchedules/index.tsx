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
import { useAlert } from '@/hooks/useAlert'

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
  const [creatingsScheduleStatus, setCreatingsScheduleStatus] = useState('')
  const { tabs, handleSaveChanges, clearTabs } = useScheduling()

  const { isLoading, setLoading } = useLoading<LoadingOptionsProps>()
  const { createAlert } = useAlert()

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
    try {
      const captchaImage = await window.electron.invoke('schedule', schedule)
      setCaptcha(captchaImage)
    } catch (error) {
      createAlert({
        title: 'Erro ao iniciar agendamento',
        message:
          'Não foi possível preencher todas as etapas do seu agendamento, verifique se todos os campos estão preenchidos corretamente.',
        severity: 'error',
      })
      setCreatingsScheduleStatus('')
    }
  }

  const handleRenewCaptcha = async () => {
    const captchaImage = await window.electron.invoke('renew-captcha')
    setCaptcha(captchaImage)
  }

  const handleSaveSchedule = async () => {
    try {
      await window.electron.invoke('fill-captcha', schedule.captcha)

      const finishedSchedules = localStorage.getItem('schedules-finished')

      if (finishedSchedules) {
        const parsedSchedules = JSON.parse(finishedSchedules)
        localStorage.setItem(
          'schedules-finished',
          JSON.stringify([...parsedSchedules, schedule])
        )
      } else {
        localStorage.setItem('schedules-finished', JSON.stringify([schedule]))
      }

      setActiveStep(prevStep => prevStep + 1)
      createAlert({
        title: 'Agendamento realizado com sucesso!',
        message: 'Agendamento foi movido para a área de agendados.',
        severity: 'success',
      })

      if (activeStep + 1 == tabs.length) {
        onClose()
        clearTabs()
      }
    } catch (error) {
      createAlert({
        title: 'Algo deu errado',
        message: 'Verifique se o captcha foi preenchido corretamente.',
        severity: 'error',
      })
    }
  }

  useEffect(() => {
    window.electron.receive('creating-schedule-status', (status: string) => {
      setCreatingsScheduleStatus(status)
    })
  }, [])

  useEffect(() => {
    if (!open) return
    getAvailableHours()
    setActiveStep(0)
    setCaptcha('')
    setStatus('incomplete')
  }, [open])

  useEffect(() => {
    if (!open) return

    if (status === 'incomplete') {
      if (schedule?.date) {
        setStatus('completed')
      }
    }
  }, [schedule])

  useEffect(() => {
    if (!open) return
    setStatus('incomplete')
    setAvailableHours([])
    getAvailableHours()
    setCaptcha('')
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
              creatingsScheduleStatus={creatingsScheduleStatus}
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
