import { ApiResponseProps } from '@/types/api'

type GetFowardingAgentProps = {
  identifier: string
  nidom: string
}

const FAKE_USERS = [
  { identifier: '000000000', cnomecompleto: 'George Lucas' },
  { identifier: '000000001', cnomecompleto: 'Bruce Wayne' },
  { identifier: '000000002', cnomecompleto: 'Clark Kent' },
  { identifier: '000000003', cnomecompleto: 'Luke Skywalker' },
  { identifier: '000000004', cnomecompleto: 'Han Solo' },
]

export async function getFowardingAgent({
  identifier,
  nidom,
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
