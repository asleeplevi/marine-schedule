import { CardTitle } from '@/components/CardTitle'
import { Input } from '@/components/Input'
import { InputMask } from '@/components/InputMask'
import { useLoading } from '@/hooks/useLoading'
import { useScheduling } from '@/hooks/useScheduling'
import { GetOrganizationsProps } from '@/ipc/functions/getOrganizations'
import { Scheduling } from '@/types/scheduling'
import {
  Card,
  CardContent,
  Container,
  Autocomplete,
  TextField,
  Tooltip,
  IconButton,
  Box,
  Button,
  useMediaQuery,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Form, Formik } from 'formik'
import { useEffect, useState, useMemo } from 'react'
import { IntestedsList } from './Interesteds'
import { Services } from '@/ipc/functions/getServices'

type LoadingOpts = 'organizations' | 'changing-tab'

export const CreateSchedulesForm = () => {
  const { isLoading, setLoading } = useLoading<LoadingOpts>()

  const [selectedOrgId, setSelectedOrgId] = useState('')
  const [organizations, setOrganizations] = useState<
    GetOrganizationsProps['data']
  >([])
  const [services, setServices] = useState<{ [key: number]: Services[] }>({})

  const { handleSaveChanges, activeTab, tabs } = useScheduling()

  const initialValues = useMemo(() => {
    return tabs[activeTab]
  }, [activeTab, tabs])

  const handleAddNewInterested = () => {
    const newValues = initialValues
    newValues.interesteds.push({
      identifier: '',
      gru: 0,
      name: '',
      service: '',
    })
    handleSaveChanges(newValues, activeTab)
  }

  const handleDeleteInterested = (index: number) => {
    const newValues = initialValues
    newValues.interesteds.splice(index, 1)

    handleSaveChanges(newValues, activeTab)
  }

  const getServices = async (
    fields: Scheduling['interesteds'][number],
    index: number
  ) => {
    const { data } = await window.api.get.getServices({
      gru: fields.gru,
      identifier: fields.identifier,
      nidom: initialValues.organization.nidom,
    })

    const newServices = services

    newServices[index] = data

    setServices(newServices)
  }

  const handleUpdateInterested = async (
    fields: Scheduling['interesteds'][number],
    index: number
  ) => {
    const newValues = initialValues
    if (fields.gru) getServices(fields, index)

    if (fields.identifier) {
      const name = await window.api.get.forwardingAgent({
        nidom: initialValues.organization.nidom,
        identifier: fields.identifier,
        validarAtivo: false,
      })

      const fieldsWithName = {
        ...fields,
        name: name.data.name,
      }

      newValues.interesteds.splice(index, 1, fieldsWithName)
      handleSaveChanges(
        { ...newValues, interesteds: newValues.interesteds.slice(0) },
        activeTab
      )
    }
  }

  const getAllServices = async () => {
    for (let index = 0; index < initialValues.interesteds.length; index++) {
      const interested = initialValues.interesteds[index]
      if (interested.gru > 0) {
        getServices(interested, index)
      }
    }
  }

  useEffect(() => {
    ;(async () => {
      const { data } = await window.api.get.organization()
      setOrganizations(data)
    })()
  }, [])

  useEffect(() => {
    if (initialValues?.organization?.nidom) {
      setSelectedOrgId(initialValues.organization.nidom)
    }

    if (initialValues.interesteds.length > 0) {
      getAllServices()
    }
  }, [initialValues])

  if (organizations.length <= 0) return <p>...</p>
  return (
    <Container maxWidth='md' sx={{ pt: 2 }}>
      <Card variant='outlined'>
        <CardTitle
          title='Cadastrar agendamento'
          action={
            <Tooltip title='Novo interessado'>
              <IconButton size='small' onClick={handleAddNewInterested}>
                <AddIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          }
        />
        <CardContent>
          <Formik initialValues={initialValues} onSubmit={() => {}}>
            {({ setFieldValue, values }) => (
              <Form onBlur={() => handleSaveChanges(values, activeTab)}>
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
                <InputMask
                  mask={{
                    mask: [
                      { mask: '000.000.000-00' },
                      { mask: '00.000.000/0000-00', lazy: false },
                    ],
                  }}
                  withFormik
                  name='forwardingAgent.identifier'
                  label='CPF/CNPJ despachante'
                />
                <Input
                  withFormik={false}
                  disabled
                  name=''
                  label='Nome Despachante'
                  value={initialValues?.forwardingAgent?.name || ''}
                />
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
      <IntestedsList
        handleUpdateInterested={handleUpdateInterested}
        interesteds={initialValues.interesteds}
        onDelete={handleDeleteInterested}
        services={services}
      />
    </Container>
  )
}
