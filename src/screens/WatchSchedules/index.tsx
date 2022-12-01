import { CardTitle } from '@/components/CardTitle'
import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { InputMask } from '@/components/InputMask'
import { useEffect, useState } from 'react'
import { OrganizationsResponse } from '@/ipc/functions/getOrganizations'
import { Form, Formik } from 'formik'
import { Input } from '@/components/Input'
import { useAlert } from '@/hooks/useAlert'

export const WatchSchedule = () => {
  const [canWatch, setCanWatch] = useState(false)
  const [selectedOrgId, setSelectedOrgId] = useState('')
  const [organizations, setOrganizations] = useState<OrganizationsResponse[]>(
    []
  )
  const [logs, setLogs] = useState<string[]>([])
  const [timeInterval, setTimeInterval] = useState(30)

  const { createAlert } = useAlert()

  const handleToggleWatch = async () => {
    if (!selectedOrgId)
      return createAlert({
        title: 'Atenção',
        message: 'Nenhuma organização selecionada',
        severity: 'warning',
      })
    if (!canWatch) {
      const message = `${new Date().toLocaleString()} - Monitoramento iniciado`
      setLogs([message])
    }
    setCanWatch(prev => !prev)
  }

  useEffect(() => {
    ;(async () => {
      const { data } = await window.api.get.organization()
      setOrganizations(data)
    })()
  }, [])

  useEffect(() => {
    if (!canWatch) return clearInterval(1)

    const interval = setInterval(async () => {
      const result = await window.api.get.checkHasSchedule({
        nidom: selectedOrgId,
      })
      const status = result.data.result
        ? 'Há agendamento disponível'
        : 'Não há agendamento disponível'
      const message = `${new Date().toLocaleString()} - ${status}`
      setLogs(prevLogs => [...prevLogs, message])
    }, timeInterval * 1000)

    return () => clearInterval(interval)
  }, [canWatch])

  useEffect(() => {
    if (canWatch) setCanWatch(false)
  }, [selectedOrgId])

  return (
    <Container sx={{ py: 2 }}>
      <Card variant='outlined'>
        <CardTitle title='Monitorar Abertura Agendamento' />
        <CardContent>
          <Formik initialValues={{}} onSubmit={() => {}}>
            {({ setFieldValue }) => (
              <Form>
                <Autocomplete
                  options={organizations}
                  getOptionLabel={option =>
                    `${option?.nidom} - ${option?.name}`
                  }
                  onChange={(_, option) => {
                    setSelectedOrgId(option?.nidom || '')
                    setFieldValue('organization', option)
                  }}
                  renderInput={params => (
                    <TextField {...params} label='Organização Militar' />
                  )}
                  isOptionEqualToValue={(a, b) => a?.nidom === b?.nidom}
                  value={
                    organizations.find(org => org.nidom === selectedOrgId) ||
                    null
                  }
                />
                <Input
                  name='intervalo'
                  label='Intervalo de Monitoramento (em segundos)'
                  type='number'
                  value={timeInterval}
                  onChange={({ target }) =>
                    setTimeInterval(parseInt(target.value))
                  }
                />
              </Form>
            )}
          </Formik>
        </CardContent>
        <CardActions>
          <Stack width='100%' direction='row' justifyContent='flex-end'>
            <Button
              color={canWatch ? 'error' : 'primary'}
              onClick={handleToggleWatch}
            >
              {canWatch ? 'Parar Monitoramento' : 'Iniciar Monitoramento'}
            </Button>
          </Stack>
        </CardActions>
      </Card>
      <Card
        variant='outlined'
        sx={{
          height: 200,
          mt: 2,
          overflowY: 'scroll',
          '::-webkit-scrollbar': {
            width: 10,
          },
          '::-webkit-scrollbar-thumb': {
            bgcolor: 'divider',
            borderRadius: 2,
          },
        }}
      >
        <CardContent>
          {logs.map(log => (
            <Typography key={log}>{log}</Typography>
          ))}
          {logs.length === 0 && 'Nenhum log encontrado'}
        </CardContent>
      </Card>
    </Container>
  )
}
