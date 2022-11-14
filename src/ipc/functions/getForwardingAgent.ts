import { ApiResponseProps } from '@/types/api'

type GetFowardingAgentProps = {
  identifier: string
  nidom: string
  validarAtivo: boolean
  prefetch: boolean
}

const FAKE_USERS = [
  { identifier: '000.000.000-00', cnomecompleto: 'George Lucas' },
  { identifier: '000.000.000-01', cnomecompleto: 'Bruce Wayne' },
  { identifier: '000.000.000-02', cnomecompleto: 'Clark Kent' },
  { identifier: '000.000.000-03', cnomecompleto: 'Luke Skywalker' },
  { identifier: '000.000.000-04', cnomecompleto: 'Han Solo' },
]

type ScrapperResponse = {
  lvalido: boolean
  lencontrado: boolean
  cnomecompleto: string
}

export async function getFowardingAgent({
  identifier,
  nidom,
  validarAtivo = true,
  prefetch = true,
}: GetFowardingAgentProps): Promise<ApiResponseProps<{ name: string }>> {
  const identifierOnlyNumber = identifier.replace(/\W+/gi, '')
  if (identifierOnlyNumber.length < 11) throw new Error('CPF/CNPJ inválido')
  const type = identifierOnlyNumber.length > 11 ? 'CNPJ' : 'CPF'

  const URL = `buscarcpfcnpj.php?nidom=${nidom}&ncpfcnpj=${identifier}&ctipodocto=${type}&lvalidaativo=${validarAtivo}`
  const URL_PREFETCH = `etapas.php?nidom=${nidom}&nacaoselecionada=1`
  if (prefetch) await window.electron.invoke('scrapper', URL_PREFETCH)
  const responseText = await window.electron.invoke('scrapper', URL)
  const [response] = JSON.parse(responseText) as ScrapperResponse[]

  if (!response.lencontrado) throw new Error('Usuário não encontrado')

  return {
    isCached: false,
    status: 'success',
    data: { name: response.cnomecompleto },
  }
}
