import { Box, Typography, Stack } from '@mui/material'

type SectionProps = {
  title: string
  children: React.ReactNode
}

export const Section = ({ title, children }: SectionProps) => {
  return (
    <Box sx={{ mb: 1, position: 'relative' }}>
      <Typography
        variant='body2'
        fontWeight='bold'
        color='text.secondary'
        sx={{ my: 0.5 }}
      >
        {title}
      </Typography>
      <Stack sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 1 }}>
        {children}
      </Stack>
    </Box>
  )
}
