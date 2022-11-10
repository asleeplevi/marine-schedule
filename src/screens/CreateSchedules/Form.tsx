import { Autocomplete } from '@/components/Autocomplete'
import { CardTitle } from '@/components/CardTitle'
import { Input } from '@/components/Input'
import { InputMask } from '@/components/InputMask'
import { useLoading } from '@/hooks/useLoading'
import { useScheduling } from '@/hooks/useScheduling'
import { GetOrganizationsProps } from '@/ipc/functions/getOrganizations'
import { Scheduling } from '@/types/scheduling'
import { Card, CardContent, Container, Stack } from '@mui/material'
import { Form, Formik, FormikProps } from 'formik'
import { useEffect, useState, useRef, useMemo } from 'react'

type LoadingOpts = 'organizations'

export const CreateSchedulesForm = () => {
  const { isLoading, setLoading } = useLoading<LoadingOpts>()

  const formRef = useRef<FormikProps<Scheduling>>({} as FormikProps<Scheduling>)
  const [organizations, setOrganizations] = useState<
    GetOrganizationsProps['data']
  >([])

  const { handleSaveChanges, activeTab, tabs } = useScheduling()
  const initialValues = useMemo(() => tabs[activeTab], [activeTab, tabs])

  async function getForwardingAgentName() {
    setLoading('organizations')
    const { identifier } = initialValues.forwardingAgent
    const { nidom } = initialValues.organization

    const response = await window.api.get.forwardingAgent({
      identifier: identifier,
      nidom: nidom,
    })
    setLoading('organizations', true)
    return response.data.name
  }

  useEffect(() => {
    ;(async () => {
      const { data } = await window.api.get.organization()
      setOrganizations(data)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const forwardingAgentName = await getForwardingAgentName()

      const updatedScheduling = initialValues
      updatedScheduling.forwardingAgent.name = forwardingAgentName

      handleSaveChanges(updatedScheduling, activeTab)
    })()
  }, [initialValues])

  if (!tabs[activeTab] || organizations.length <= 0)
    return (
      <Container>
        <p>loading</p>
      </Container>
    )

  return (
    <Container maxWidth='md' sx={{ pt: 2 }}>
      <Card variant='outlined'>
        <CardTitle title='Cadastrar agendamento' />
        <CardContent>
          <Formik
            initialValues={initialValues}
            onSubmit={() => {}}
            innerRef={formRef}
          >
            {() => (
              <Form
                onBlur={() =>
                  handleSaveChanges(formRef.current.values, activeTab)
                }
              >
                <Autocomplete
                  loading={isLoading('organizations')}
                  options={organizations}
                  name='organization.nidom'
                  label='Organização Militar'
                  getOptionLabel={option =>
                    `${option?.nidom} - ${option?.name}`
                  }
                  getOptionValue={option => option?.nidom}
                  defaultValue={organizations.find(
                    organization =>
                      organization.nidom === initialValues.organization.nidom
                  )}
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
                  value={initialValues.forwardingAgent.name}
                />
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Container>
  )
}
