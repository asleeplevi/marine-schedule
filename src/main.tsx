import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { AppRoutes } from './routes'
import './ipc/node-api'
import { ThemeProvider } from './contexts/theme'
import { AlertProvider } from './contexts/alert'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AlertProvider>
        <CssBaseline />
        <AppRoutes />
      </AlertProvider>
    </ThemeProvider>
  </React.StrictMode>
)

postMessage({ payload: 'removeLoading' }, '*')
