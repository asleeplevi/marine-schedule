import { ApiResponseProps } from '@/types/api'

export type OrganizationsResponse = {
  name: string
  nidom: string
}

type ScrapperResponse = {
  nidom: string
  inicial: boolean
  cnomedaom: string
}

export type GetOrganizationsProps = ApiResponseProps<OrganizationsResponse[]>

export async function getOrganizations(): Promise<GetOrganizationsProps> {
  const URL = '/mainpage.php'
  const responseText = await window.electron.invoke('scrapper', URL)
  const response = JSON.parse(responseText) as [{ oms: ScrapperResponse[] }]

  const oms = response[0].oms

  const formattedResponse = oms
    .filter(om => !om.inicial)
    .map(({ cnomedaom, nidom }) => ({
      name: cnomedaom,
      nidom,
    }))

  return { status: 'success', data: formattedResponse, isCached: false }
}
