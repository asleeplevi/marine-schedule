import { Box, Stack, Modal as MuiModal, Grow, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

type ModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Modal = ({ open, onClose, children }: ModalProps) => {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grow in={open} unmountOnExit>
        <Stack
          bgcolor='background.paper'
          width='90vw'
          height='90vh'
          borderRadius={1}
          position='relative'
          overflow='auto'
          sx={{
            '::-webkit-scrollbar': {
              width: 10,
            },
            '::-webkit-scrollbar-thumb': {
              bgcolor: 'divider',
              borderRadius: 2,
            },
            color: 'text.primary',
          }}
        >
          <Box position='absolute' top={2} right={2}>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          {children}
        </Stack>
      </Grow>
    </MuiModal>
  )
}
