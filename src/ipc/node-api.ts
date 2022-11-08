import { ipcRenderer } from 'electron'
import { getOrganizations } from './functions/getOrganizations'

declare global {
  interface Window {
    api: typeof api
    electron: {
      invoke: Electron.IpcRenderer['invoke']
    }
  }
}

// ipcRenderer.on('main-process-message', (_event, ...args) => {
//   console.log('[Receive Main-process message]:', ...args)
// })

const api = {
  get: {
    organization: getOrganizations,
  },
}

if (!window.api) {
  window.api = api
  window.electron = {
    invoke: ipcRenderer.invoke,
  }
}
