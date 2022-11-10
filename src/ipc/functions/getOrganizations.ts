import { ApiResponseProps } from '@/types/api'

export const FAKE_ORGANIZATIONS = [
  {
    name: 'Capitania 1',
    nidom: '1',
  },
  {
    name: 'Capitania 2',
    nidom: '2',
  },
  {
    name: 'Capitania 3',
    nidom: '3',
  },
  {
    name: 'Capitania 4',
    nidom: '4',
  },
]

export type GetOrganizationsProps = ApiResponseProps<typeof FAKE_ORGANIZATIONS>

export function getOrganizations(): GetOrganizationsProps {
  return { status: 'success', data: FAKE_ORGANIZATIONS, isCached: false }
}
