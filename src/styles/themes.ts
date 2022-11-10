import { createTheme } from '@mui/material'
export const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',
        margin: 'normal',
      },
    },
  },
})
