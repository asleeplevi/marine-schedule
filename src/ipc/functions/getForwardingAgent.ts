import { ApiResponseProps } from '@/types/api'

type GetFowardingAgentProps = {
  identifier: string
  nidom: string
  validarAtivo: boolean
}

const FAKE_USERS = [
  { identifier: '000.000.000-00', cnomecompleto: 'George Lucas' },
  { identifier: '000.000.000-01', cnomecompleto: 'Bruce Wayne' },
  { identifier: '000.000.000-02', cnomecompleto: 'Clark Kent' },
  { identifier: '000.000.000-03', cnomecompleto: 'Luke Skywalker' },
  { identifier: '000.000.000-04', cnomecompleto: 'Han Solo' },
]

export async function getFowardingAgent({
  identifier,
  nidom,
  validarAtivo,
}: GetFowardingAgentProps): Promise<ApiResponseProps<{ name: string }>> {
  // const type = identifier.replace(/\W+/gi, '').length > 11 ? 'CNPJ' : 'CPF'
  await new Promise(resolve => setTimeout(resolve, 3000))
  const response = FAKE_USERS.find(user => user.identifier === identifier)

  if (!response) throw new Error('Usuário não encontrado')

  return {
    isCached: false,
    status: 'success',
    data: { name: response.cnomecompleto },
  }
}
