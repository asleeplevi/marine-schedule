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
          bgcolor='white'
          width='90vw'
          height='90vh'
          borderRadius={2}
          position='relative'
          overflow='auto'
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
