import { ApiResponseProps } from '@/types/api'

type getServicesProps = {
  nidom: string
  gru: number
  identifier: string
}

export type Services = {
  name: string
  id: string
}
type MarineServicesProps = {
  cdescricaoservico: string
  nidservico: string
}

type MarineResponseProps = {
  cdescricaoservicogru: string
  cmensagem: string
  lretorno: boolean
  nidservico: number
  servicos: MarineServicesProps[]
}
type GetServicesResponseProps = ApiResponseProps<Services[]>

export async function getServices({
  gru,
  identifier,
  nidom,
}: getServicesProps): Promise<GetServicesResponseProps> {
  if (String(gru).length < 3) throw new Error('GRU inválido')

  const url = `validargruinformada.php?nidom=${nidom}&nnumerodagru=${gru}&ncpfcnpj=${identifier}`
  const responseText = await window.electron.invoke('scrapper', url)

  const response = JSON.parse(
    responseText.replace(/(\r)(\n)/gi, '')
  ) as MarineResponseProps

  const formattedResponse = response.servicos.map(service => ({
    id: service.nidservico,
    name: service.cdescricaoservico,
  }))

  return {
    data: formattedResponse,
    isCached: false,
    status: 'success',
  }
}
