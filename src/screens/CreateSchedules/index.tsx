import { NoTabsOpened } from '@/components/NoTabsOpened'
import { TabsBar } from '@/components/Tabs'
import { useScheduling } from '@/hooks/useScheduling'
import { CreateSchedulesForm } from './Form'
import { useState, useEffect } from 'react'
import { Box, Button, Stack } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import { SavingSchedules } from '@/components/SavingSchedules'

type StatusProps = 'changing-tab' | ''

const OPENED_BUTTON_WIDTH = 250
const CLOSED_BUTTON_WIDTH = 45

export const CreateSchedules = () => {
  const { tabs, activeTab } = useScheduling()
  const [modal, setModal] = useState('')
  const [status, setStatus] = useState<StatusProps>('')

  useEffect(() => {
    ;(async () => {
      setStatus('changing-tab')
      await new Promise(resolve => setTimeout(resolve, 10))

      setStatus('')
    })()
  }, [activeTab])

  return (
    <div>
      <TabsBar />
      {status === 'changing-tab' && <p>carregando</p>}
      {tabs.length <= 0 && <NoTabsOpened />}
      {tabs.length > 0 && status !== 'changing-tab' && <CreateSchedulesForm />}
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
