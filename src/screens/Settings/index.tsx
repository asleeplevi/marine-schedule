import { CardTitle } from '@/components/CardTitle'
import {
  Switch,
  Typography,
  Container,
  Card,
  CardContent,
  Stack,
} from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useTheme } from '@/hooks/useTheme'
import { useEffect, useState } from 'react'

export const Settings = () => {
  const props = useTheme()
  const [showScrapper, setShowScrapper] = useState(true)
  const [mode, setMode] = useState('light')

  const handleChangeColorMode = (value: boolean) => {
    const newMode = value ? 'dark' : 'light'
    setMode(newMode)
    props.setMode(newMode)
    window.localStorage.setItem('settings@theme', String(newMode))
  }

  const handleChangeShowScrapper = (value: boolean) => {
    window.localStorage.setItem('settings@show-scrapper', String(value))
    setShowScrapper(value)
  }

  useEffect(() => {
    const defaultTheme = window.localStorage.getItem('settings@theme') as string
    const showScrapperStorage = window.localStorage.getItem(
      'settings@show-scrapper'
    ) as string
    setMode(defaultTheme)

    if (showScrapperStorage !== '') {
      setShowScrapper(showScrapperStorage === 'true')
    }
  }, [])

  return (
    <Container maxWidth='sm' sx={{ pt: 2 }}>
      <Card variant='outlined'>
        <CardTitle title='Configurações' />
        <CardContent>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            gap={2}
            sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
          >
            <Typography variant='body2'>Exibir scrapper</Typography>
            <Stack direction='row' alignItems='center'>
              <Typography variant='body2'>Não</Typography>
              <Switch
                checked={showScrapper}
                onChange={(_, value) => handleChangeShowScrapper(value)}
              />
              <Typography variant='body2'>Sim</Typography>
            </Stack>
          </Stack>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            gap={2}
          >
            <Typography variant='body2'>Tema</Typography>
            <Stack
              direction='row'
              alignItems='center'
              sx={{ color: 'text.secondary' }}
            >
              <LightModeIcon />
              <Switch
                checked={mode === 'dark'}
                onChange={(_, value) => handleChangeColorMode(value)}
              />
              <DarkModeIcon />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  )
}
