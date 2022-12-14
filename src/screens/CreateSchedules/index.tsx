import { NoTabsOpened } from '@/components/NoTabsOpened'
import { TabsBar } from '@/components/Tabs'
import { useScheduling } from '@/hooks/useScheduling'
import { CreateSchedulesForm } from './Form'
import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import { SavingSchedules } from '@/components/SavingSchedules'

type StatusProps = 'changing-tab' | 'ready' | 'starting-scrapper' | ''

const OPENED_BUTTON_WIDTH = 250
const CLOSED_BUTTON_WIDTH = 45

export const CreateSchedules = () => {
  const { tabs, activeTab } = useScheduling()
  const [modal, setModal] = useState('')
  const [status, setStatus] = useState<StatusProps>('')

  const schedule = tabs[activeTab]

  function startPuppeteer() {
    const showScrapper =
      window.localStorage.getItem('settings@show-scrapper') === 'true'
    window.electron.invoke('start-scrapper', showScrapper ? false : true)
    setStatus('ready')
  }

  useEffect(() => {
    if (tabs.length <= 0) return
    ;(async () => {
      setStatus('changing-tab')
      await new Promise(resolve => setTimeout(resolve, 100))
      setStatus('ready')
    })()
  }, [activeTab])

  useEffect(() => {
    startPuppeteer()
  }, [])

  return (
    <div>
      {status === 'starting-scrapper' && (
        <Container maxWidth='md' sx={{ pt: 2 }}>
          <Card variant='outlined'>
            <Stack height={280} justifyContent='center' alignItems='center'>
              <Typography>Iniciando robo...</Typography>
            </Stack>
          </Card>
        </Container>
      )}
      {status === 'ready' && <TabsBar />}
      {status === 'changing-tab' && tabs.length > 0 && (
        <Container maxWidth='md' sx={{ pt: 2 }}>
          <Card variant='outlined'>
            <Stack height={280} justifyContent='center' alignItems='center'>
              <CircularProgress color='inherit' />
            </Stack>
          </Card>
        </Container>
      )}
      {tabs.length <= 0 && <NoTabsOpened />}
      {tabs.length > 0 && status === 'ready' && <CreateSchedulesForm />}
      <Box
        sx={{
          position: 'fixed',
          right: 25,
          bottom: 25,
        }}
      >
        <Button
          sx={{
            maxWidth: CLOSED_BUTTON_WIDTH,
            minWidth: CLOSED_BUTTON_WIDTH,
            width: CLOSED_BUTTON_WIDTH,
            height: CLOSED_BUTTON_WIDTH,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            position: 'relative',
            transition: 'all ease 500ms',
            '&:hover': {
              maxWidth: OPENED_BUTTON_WIDTH,
              minWidth: OPENED_BUTTON_WIDTH,
              width: OPENED_BUTTON_WIDTH,
            },
          }}
          onClick={() => setModal('savingSchedules')}
          variant='contained'
          disableElevation
          disabled={tabs.length <= 0}
        >
          <Stack
            direction='row'
            height={25}
            position='absolute'
            right={10}
            gap={1.5}
          >
            Salvar agendamentos
            <SaveIcon />
          </Stack>
        </Button>
      </Box>
      <SavingSchedules
        open={modal === 'savingSchedules'}
        onClose={() => setModal('')}
      />
    </div>
  )
}
