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
  id: string
}
//https://sistemas.dpc.mar.mil.br/sisap/agendamento/server/

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

const AVAILABLE_SERVICES =
  '{"lretorno":true,"cmensagem":"","nidservico":410,"cdescricaoservicogru":"INSCRI\u00c7\u00c3O DE EMBARCA\u00c7\u00c3O, EMISS\u00c3O, RENOVA\u00c7\u00c3O OU DE 2\u00aa VIA DE TIE/TIEM, TRANSFER\u00caNCIA DE PROPRIEDADE E/OU JURISDI\u00c7\u00c3O DE EMBARCA\u00c7\u00c3O,\r\nALTERA\u00c7\u00c3O DE DADOS CADASTRAIS, REGISTRO E CANCELAMENTO","servicos":[{"nidservico":0,"cdescricaoservico":"Selecione o servi\u00e7o desejado."},{"nidservico":"YnNGcHlYT3BwL2ZDcU1idFRUUUFxSnZQSTdrTTJtUVZpMkNuZnhEa05ldz0","cdescricaoservico":" TITULO DE INSCRICAO DE EMBARCACAO (TIE/TIEM) - RENOVA\u00c7\u00c3O "},{"nidservico":"REluTlc2WENoelJyUldsNDN0bjlvalRIYTNkQ3JRM1A0OGllMG4xUFQ2TT0","cdescricaoservico":"CANCELAMENTO DO REGISTRO DE ONUS E AVERBACOES - EMBARCACAO INSCRITA NA CP/DL/AG"},{"nidservico":"dmN2YSt0UHYzeDFrQnFRc1cwNGF1MVpnOGJXYndvQnp6UzhFekowUExDMD0","cdescricaoservico":"EMBARCACOES INSCRITAS NAS CP/DL/AG - ALTERACAO DE CARACTERISTICAS DA EMBARCACAO, DA RAZAO SOCIAL OU MUDANCA DE ENDERECO DO PROPRIETARIO"},{"nidservico":"RENoeHVQQmgvaU01V09wN2d3a2lYWUtYL2hkMUEzWTFHSlE1VkErZ2Q0MD0","cdescricaoservico":"REGISTRO DE ONUS E AVERBACOES - EMBARCACAO INSCRITA NA CP/DL/AG"},{"nidservico":"WWFOb1RPUUgzS1ROMnNLNUdkZnV4ZWxtN3pUcGEvZTBUekoyRjROdG44ST0","cdescricaoservico":"TIE - EMB. ESPORTE E RECREIO - COMP. MAIOR QUE 12M E MENOR 24M (MEDIO PORTE) E MAIOR OU IGUAL 24M (GRANDE PORTE) E AB MENOR OU IGUAL A 100 - EMISSAO"},{"nidservico":"bzlNUjl4YndSVTdPNUVqWGwrLzhRdm9ZdkRZc29CU2FSWkV5QVd5eStaUT0","cdescricaoservico":"TITULO DE INSCRICAO DE EMBARCACAO (TIE) - EMBARCACAO DE ESPORTE E RECREIO - COM COMPRIMENTO IGUAL OU MENOR QUE 12 METROS "},{"nidservico":"ZWh4MS9nVXNVejJQai9kbklQN05WUXlldTdQZUlSSWRzNUhwaklpZHZTVT0","cdescricaoservico":"TITULO DE INSCRICAO DE EMBARCACAO (TIE) - NAV. MAR ABERTO - AB MENOR OU IGUAL A 100, EXCETO AS MIUDAS"},{"nidservico":"U1o4Z3gzZHNDVzF3eEgxRFVNM0hvdWJxZS83TmpzRndEeFhzWUl2amcrMD0","cdescricaoservico":"TITULO DE INSCRICAO DE EMBARCACAO (TIE) - NAVEGACAO INTERIOR - AB MENOR OU IGUAL A 100, EXCETO AS MIUDAS"},{"nidservico":"bFFMMUNpL1Nid0l2QTB1U3lnS2dBdEdBYTVYNzNkUE95aTk2MVdjTmN6RT0","cdescricaoservico":"TITULO DE INSCRICAO DE EMBARCACAO (TIE) DE MOTO AQUATICA - 2\u00aa VIA"},{"nidservico":"d3ZxSk8xUVMvRWZheDYwTDFZcmhBU1JueWYzdnpjYWh5MWN4eGY0OGtmRT0","cdescricaoservico":"TITULO DE INSCRICAO DE EMBARCACAO (TIE) DE MOTO AQUATICA - INSCRICAO E EMISSAO"},{"nidservico":"bGkvV2tENFJUZ01rVDIxSEo3KzEvMnFSS3Q3cUNDdDF1U0dDQzdWUjZWRT0","cdescricaoservico":"TITULO DE INSCRICAO DE EMBARCACAO (TIE) DE MOTO AQUATICA - RENOVACAO"},{"nidservico":"cjdwRjhYTk1NTHRnZFFPVXUxTEZ3Z2twek9qVS9wRGJqdkVwTE1yaVZMQT0","cdescricaoservico":"TITULO DE INSCRICAO DE EMBARCACAO (TIE/TIEM) - 2\u00aa VIA (ROUBO, FURTO, PERDA, EXTRAVIO OU DANO)"},{"nidservico":"ajJ2YkJrT2dHZS9WVjV4VTY0QjlVemVUOGlUbWlqV2JzTitvci9hUWI3bz0","cdescricaoservico":"TITULO DE INSCRICAO DE EMBARCACAO MIUDA (TIEM) - EMB. MIUDA COM PROPULSAO A MOTOR, EXCETO ESPORTE E/OU RECREIO - EMISSAO"},{"nidservico":"SnBYY2VhYnNQdXB2VWJWb3NaRkNqWk9HUE53OHZjM0dzbVgwbVRxSkZGRT0","cdescricaoservico":"TRANSFERENCIA DE JURISDICAO DE EMBARCACAO - INSCRITA NA CP/DL/AG"},{"nidservico":"b2NTZkVtSlh6YW9SbmJJeHdZVHZGcTdPd3BiWjFPcm1aUG1xVW5SYVlJRT0","cdescricaoservico":"TRANSFERENCIA DE JURISDICAO DE MOTO AQUATICA - INSCRITA NA CP/DL/AG"},{"nidservico":"VTcvbDdLSHhWTUk3ek10OEc5LzlKS2lUZCtjNkpDM04vR1lEZzhlcXNZYz0","cdescricaoservico":"TRANSFERENCIA DE PROPRIEDADE DE EMBARCACAO - ESPORTE E RECREIO - INSCRITA NA CP/DL/AG"},{"nidservico":"UHdna1NXNEp3eHphT0tPK2dabWRGb2xjT3FYd0FkQkU0WEpJcGs5cXR4cz0","cdescricaoservico":"TRANSFERENCIA DE PROPRIEDADE DE EMBARCACAO - NAV. MAR ABERTO - INSCRITA NA CP/DL/AG"},{"nidservico":"NHMvMERlYmMzamZlN3Z3SDRPUmdKNzd0dTBsVGFhRDhTa1V5NEtPMUl5OD0","cdescricaoservico":"TRANSFERENCIA DE PROPRIEDADE DE EMBARCACAO - NAVEGACAO INTERIOR - INSCRITA NA CP/DL/AG"},{"nidservico":"bVJYM1o0Z1A1YnpxdS83SnVjeXc2TndHZlc4dXVVb3FJZXZiMmIxVFhxOD0","cdescricaoservico":"TRANSFERENCIA DE PROPRIEDADE DE MOTO AQUATICA - INSCRITA NA CP/DL/AG"},{"nidservico":"UGZhSi8yQmpqc2J5L1k4eFhRcmJoVDJrR1NjSCtEWU14UVgwWnFKekw3TT0","cdescricaoservico":"TRANSFERENCIA DE PROPRIEDADE E JURISDICAO - ESPORTE E RECREIO - INSCRITA NA CP/DL/AG"},{"nidservico":"WmxvRWdNRDd4QUJwY3RHWkxia2R0TXgwUjk3Vk1jSkNxS2Q4WXVIQzg4RT0","cdescricaoservico":"TRANSFERENCIA DE PROPRIEDADE E JURISDICAO - NAV. MAR ABERTO - INSCRITA NA CP/DL/AG"},{"nidservico":"cjhBeHlSUUtIUm1Ea0haclBrSGlyeHZTMnoxemYrQnBLaG9ndHZiV2tFST0","cdescricaoservico":"TRANSFERENCIA DE PROPRIEDADE E JURISDICAO - NAVEGACAO INTERIOR - INSCRITAS NA CP/DL/AG"},{"nidservico":"MlpXMjhyQ0l4YnhGdnpjVzRKU0ExOEcyb1c2UkpkeGxmV1FYMk5sYUoxUT0","cdescricaoservico":"TRANSFERENCIA DE PROPRIEDADE E JURISDICAO DE MOTO AQUATICA - INSCRITA NA CP/DL/AG"}]}'

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
