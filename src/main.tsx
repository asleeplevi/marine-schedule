import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { router } from './routes'
import './ipc/node-api'
import { ThemeProvider } from './contexts/theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)

postMessage({ payload: 'removeLoading' }, '*')
