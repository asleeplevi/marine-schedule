import { withCache } from '@/middlewares'
import { ipcRenderer } from 'electron'
import { getFowardingAgent } from './functions/getForwardingAgent'
import { getOrganizations } from './functions/getOrganizations'

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
    organization: withCache(getOrganizations),
    forwardingAgent: withCache(getFowardingAgent),
  },
}

if (!window.api) {
  window.api = api
  window.electron = {
    invoke: ipcRenderer.invoke,
  }
}
