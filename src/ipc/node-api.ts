import { withCache } from '@/middlewares'
import { ipcRenderer } from 'electron'
import { getAvailableSchedules } from './functions/getAvailableScheduling'
import { getCaptcha } from './functions/getCaptcha'
import { getFowardingAgent } from './functions/getForwardingAgent'
import { getOrganizations } from './functions/getOrganizations'
import { getServices } from './functions/getServices'

declare global {
  interface Window {
    api: typeof api
    electron: {
      invoke: Electron.IpcRenderer['invoke']
    }
  }
}

const api = {
  get: {
    organization: withCache(getOrganizations, 60 * 60 * 24 * 7), // 7 dias
    forwardingAgent: withCache(getFowardingAgent, 60 * 60 * 1), // 1 hora
    services: withCache(getServices, 60 * 60 * 1), // 1 hora
    availableSchedules: getAvailableSchedules,
    captcha: getCaptcha,
  },
}

if (!window.api) {
  window.api = api
  window.electron = {
    invoke: ipcRenderer.invoke,
  }
}
