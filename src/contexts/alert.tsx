import { Alert, AlertColor, AlertTitle } from '@mui/material'
import { createContext, useEffect, useState } from 'react'

type AlertContent = {
  open?: boolean
  severity: AlertColor
  title: string
  message: string
}

type AlertContextProps = {
  createAlert: (props: AlertContent) => void
}

export const AlertContext = createContext({} as AlertContextProps)

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<AlertContent>({} as AlertContent)

  const createAlert = (props: AlertContent) => {
    setContent({ ...props, open: true })
  }

  useEffect(() => {
    if (!content?.open) return
    const timeout = setTimeout(() => {
      setContent(prev => ({ ...prev, open: false }))
    }, 5000)
    return () => clearTimeout(timeout)
  }, [content])

  return (
    <AlertContext.Provider value={{ createAlert }}>
      {children}
      {content.open && (
        <Alert
          onClose={() => setContent(prev => ({ ...prev, open: false }))}
          severity={content.severity}
          sx={{
            zIndex: 999999,
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <AlertTitle sx={{ fontWeight: 'bold' }}>{content.title}</AlertTitle>
          {content.message}
        </Alert>
      )}
    </AlertContext.Provider>
  )
}
