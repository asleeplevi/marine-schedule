import { createTheme } from '@mui/material'

export const theme = (mode: 'dark' | 'light') =>
  createTheme({
    palette: {
      mode,
    },
    components: {
      MuiTextField: {
        defaultProps: {
          size: 'small',
          margin: 'normal',
        },
      },
    },
  })
