import { ApiResponseProps } from '@/types/api'

type getServicesProps = {
  nidom: string
  gru: number
  identifier: string
}

export const FAKE_SERVICES = [
  {
    name: 'Serviço 1',
    nidom: '1',
  },
  {
    name: 'Serviço 2',
    nidom: '2',
  },
  {
    name: 'Serviço 3',
    nidom: '3',
  },
  {
    name: 'Serviço 4',
    nidom: '4',
  },
]

export type Services = {
  name: string
  nidom: string
}

export function getServices({
  gru,
  identifier,
  nidom,
}: getServicesProps): ApiResponseProps<typeof FAKE_SERVICES> {
  if (String(gru).length < 3) throw new Error('GRU inválido')
  return {
    data: FAKE_SERVICES,
    isCached: false,
    status: 'success',
  }
}
