import { Card, CardContent, Collapse, IconButton } from '@mui/material'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteIcon from '@mui/icons-material/Delete'
import { CardTitle } from '../../../components/CardTitle'
import { Input } from '../../../components/Input'
import { Form, Formik } from 'formik'
import { InterestedsProps } from '.'
import { InputMask } from '@/components/InputMask'
import { Services } from '@/ipc/functions/getServices'
import { Autocomplete } from '@/components/Autocomplete'

type IntestedCardProps = {
  index: number
  openedInteresteds: number[]
  interested: InterestedsProps
  services: { [key: number]: Services[] }
  onDelete: (index: number) => void
  handeExpandInterested: (index: number) => void
  handleUpdateInterested: (fields: InterestedsProps, index: number) => void
}

export const IntestedCard = ({
  index,
  handeExpandInterested,
  openedInteresteds,
  onDelete,
  interested,
  handleUpdateInterested,
  services,
}: IntestedCardProps) => {
  return (
    <Card variant='outlined' sx={{ my: 1 }}>
      <CardTitle
        title={`Interessado ${index + 1}`}
        action={
          <>
            <IconButton
              onClick={() => handeExpandInterested(index)}
              size='small'
            >
              {openedInteresteds.includes(index) ? (
                <ExpandLessIcon sx={{ fontSize: 18 }} />
              ) : (
                <ExpandMoreIcon sx={{ fontSize: 18 }} />
              )}
            </IconButton>
            <IconButton size='small' onClick={() => onDelete(index)}>
              <DeleteIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </>
        }
      />
      <Collapse in={openedInteresteds.includes(index)} unmountOnExit>
        <CardContent>
          <Formik initialValues={interested} onSubmit={() => {}}>
            {({ values }) => (
              <Form onBlur={() => handleUpdateInterested(values, index)}>
                <InputMask
                  mask={{
                    mask: [
                      { mask: '000.000.000-00' },
                      { mask: '00.000.000/0000-00', lazy: false },
                    ],
                  }}
                  withFormik
                  name='identifier'
                  label='CPF/CNPJ despachante'
                />
                <Input
                  withFormik={false}
                  disabled
                  name=''
                  label='Nome'
                  value={interested.name}
                />
                <Input name='gru' label='GRU' />
                <Autocomplete
                  name='service'
                  label='Serviço'
                  options={services[index] || []}
                  getOptionLabel={option => option.name}
                  getOptionValue={option => option?.name || ''}
                />
              </Form>
            )}
          </Formik>
        </CardContent>
      </Collapse>
    </Card>
  )
}
