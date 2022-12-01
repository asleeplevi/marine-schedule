import { withCache } from '@/middlewares'
import { ipcRenderer } from 'electron'
import { checkHasSchedule } from './functions/checkHasSchedule'
import { getAvailableSchedules } from './functions/getAvailableScheduling'
import { getFowardingAgent } from './functions/getForwardingAgent'
import { getOrganizations } from './functions/getOrganizations'
import { getServices } from './functions/getServices'

declare global {
  interface Window {
    api: typeof api
    electron: {
      invoke: Electron.IpcRenderer['invoke']
      receive: (channel: string, func: (...args: any) => any) => void
    }
  }
}

const api = {
  get: {
    organization: withCache(getOrganizations, 60 * 60 * 24 * 7), // 7 dias
    forwardingAgent: withCache(getFowardingAgent, 60 * 60 * 1), // 1 hora
    services: withCache(getServices, 60 * 60 * 1), // 1 hora
    availableSchedules: withCache(getAvailableSchedules, 60 * 10), // 10 min
    checkHasSchedule: checkHasSchedule,
  },
}

if (!window.api) {
  window.api = api
  window.electron = {
    invoke: ipcRenderer.invoke,
    receive: (channel, func) => {
      ipcRenderer.on(channel, (_, ...args) => func(...args))
    },
  }
}
