import { ApiResponseProps } from '@/types/api'

type getServicesProps = {
  nidom: string
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
  ccep: string
  cendereco: string
  cmunicipio: string
  ctelefone: string
  ctextoetapa1: string
  ctextoetapa2: string
  ctextoetapa3: string
  ctextoetapa4: string
  ctextoetapa5: string
  cuf: string
  inforepresentant: string
  nqtdservicos: number
  temagenda: boolean
}
type CheckHasScheduleProps = ApiResponseProps<{ result: boolean }>

export async function checkHasSchedule({
  nidom,
}: getServicesProps): Promise<CheckHasScheduleProps> {
  const url = `etapas.php?nidom=${nidom}&nacaoselecionada=2`
  const responseText = await window.electron.invoke('scrapper', url)

  const [response] = JSON.parse(
    responseText.replace(/(\r)(\n)/gi, '')
  ) as MarineResponseProps[]

  const formattedResponse = response.temagenda

  return {
    data: { result: formattedResponse },
    isCached: false,
    status: 'success',
  }
}
