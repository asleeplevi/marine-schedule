import {
  Box,
  Button,
  Typography,
  Card,
  Stack,
  IconButton,
  Checkbox,
} from '@mui/material'
import LeftIcon from '@mui/icons-material/ArrowLeft'
import RightIcon from '@mui/icons-material/ArrowRight'
import { useState, useEffect } from 'react'
import { GetAvailableSchedulesResponseProps } from '@/ipc/functions/getAvailableScheduling'

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'

type HourTypesProps = 'am' | 'pm'

type SelectedHourProps = {
  hour: string
  type: HourTypesProps
}

type CalendarProps = {
  availableDays: GetAvailableSchedulesResponseProps[]
  defaultValue?: Date
  onChangeMonth: (date: string) => void
  onChangeDate: (date: Date) => void
}

export const Calendar = ({
  availableDays,
  onChangeMonth,
  onChangeDate,
  defaultValue,
}: CalendarProps) => {
  const CURRENT_YEAR = new Date().getFullYear()
  const CURRENT_MONTH = new Date().getMonth()

  const [selectedYear, setSelectedYear] = useState<number>(
    getDefaultValue('year') as number
  )
  const [selectedMonth, setSelectedMonth] = useState<number>(
    getDefaultValue('month') as number
  )
  const [selectedDay, setSelectedDay] = useState<number | undefined>(
    getDefaultValue('date') as number
  )
  const [selectedHour, setSelectedHour] = useState<SelectedHourProps>(
    getDefaultValue('hour') as SelectedHourProps
  )

  function getDefaultValue(part: 'year' | 'month' | 'date' | 'hour') {
    const response = {
      year: CURRENT_YEAR,
      month: CURRENT_MONTH,
      date: undefined,
      hour: { hour: '', type: 'am' },
    } as {
      year: number
      month: number
      date: number | undefined
      hour: SelectedHourProps
    }
    if (defaultValue) {
      const defaultDate = new Date(defaultValue)

      const fullHour = defaultDate.getHours()

      const hour = fullHour > 12 ? fullHour - 12 : fullHour
      const minutes = defaultDate.getMinutes()
      const fomattedHour = `${String(hour).padStart(2, '0')}:${String(
        minutes
      ).padStart(2, '0')}`

      response.year = defaultDate.getFullYear()
      response.month = defaultDate.getMonth()
      response.date = defaultDate.getDate()
      response.hour = { hour: fomattedHour, type: fullHour > 12 ? 'pm' : 'am' }

      return response[part]
    }
    return response[part]
  }

  function getDayOfWeek(day: number, month: number, year: number) {
    return new Date(year, month, day).toLocaleString('pt-br', {
      weekday: 'long',
    })
  }

  function getNumberOfDaysIntMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate()
  }

  const numberOfDays = getNumberOfDaysIntMonth(selectedMonth + 1, selectedYear)

  const DAYS_OF_WEEK = [
    'domingo',
    'segunda',
    'terça',
    'quarta',
    'quinta',
    'sexta',
    'sábado',
  ]

  const fullCurrentDate = (day: number) =>
    `${selectedYear}/${selectedMonth + 1}/${String(day).padStart(2, '0')}`

  function createArrayOfDays() {
    const day = getDayOfWeek(1, selectedMonth, selectedYear)
    const firstWord = day.split('-')[0]

    const startDay = DAYS_OF_WEEK.findIndex(day => firstWord === day)

    const arrayOfDays = Array.from({ length: numberOfDays }).map(
      (_, index) => ({
        number: String(index + 1),
        isAvailable: availableDays.some(
          day => day.date === fullCurrentDate(index + 1)
        ),
      })
    )

    const nullDays = Array.from({ length: startDay }).map(() => ({
      number: '',
      isAvailable: false,
    }))

    arrayOfDays.unshift(...nullDays)

    return arrayOfDays
  }

  function getAvailableHours() {
    const today = availableDays.find(
      day => day.date === fullCurrentDate(selectedDay as number)
    ) as GetAvailableSchedulesResponseProps
    return today?.hours
  }

  const currentDayFormatted = new Date(
    selectedYear,
    selectedMonth,
    selectedDay
  ).toLocaleString('pt-br', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  function handleChangeMonth(newMonth: number) {
    let month = newMonth
    let year = selectedYear

    if (newMonth > 11) {
      setSelectedYear(year => year + 1)
      setSelectedMonth(0)
      year = selectedYear + 1
      month = 0
    } else if (newMonth < 0) {
      setSelectedYear(year => year - 1)
      setSelectedMonth(11)
      month = 11
      year = selectedYear - 1
    } else {
      setSelectedMonth(newMonth)
      month = newMonth
    }
    onChangeMonth(`${month}/${year}`)
    setSelectedDay(undefined)
  }

  function handleSelectedHour(newHour: string, type: 'am' | 'pm') {
    setSelectedHour({ hour: newHour, type })

    const [hour, minutes] = newHour.split(':')

    const fullDate = new Date(
      selectedYear,
      selectedMonth,
      selectedDay,
      type === 'am' ? parseInt(hour) : parseInt(hour) + 12,
      parseInt(minutes)
    )

    onChangeDate(fullDate)
  }

  function handleSelectDay(newDay: number) {
    setSelectedHour({ hour: '', type: 'am' })
    setSelectedDay(newDay)
  }

  return (
    <Box sx={{ px: 2 }}>
      <Stack direction='row'>
        <Stack>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            width={`${30 * 7 + 6 + 12}px`}
          >
            <IconButton
              size='small'
              disabled={
                CURRENT_MONTH === selectedMonth && selectedYear === CURRENT_YEAR
              }
              onClick={() => handleChangeMonth(selectedMonth - 1)}
            >
              <LeftIcon />
            </IconButton>
            <Typography variant='body2'>
              {selectedMonth + 1}/{selectedYear}
            </Typography>
            <IconButton
              size='small'
              onClick={() => handleChangeMonth(selectedMonth + 1)}
            >
              <RightIcon />
            </IconButton>
          </Stack>
          <Card
            variant='outlined'
            sx={{ p: '5px', width: `${30 * 7 + 6 + 12}px` }}
          >
            <Box display='grid' gridTemplateColumns='repeat(7, 30px)' gap='1px'>
              {DAYS_OF_WEEK.map((day, index) => (
                <Typography variant='caption' key={index} textAlign='center'>
                  {day.split('')[0].toLocaleUpperCase()}
                </Typography>
              ))}
              {createArrayOfDays().map((day, index) => (
                <Button
                  key={index}
                  size='small'
                  sx={{
                    width: '100%',
                    height: '100%',
                    minWidth: 'unset',
                  }}
                  variant={
                    selectedDay === parseInt(day.number)
                      ? 'contained'
                      : day.isAvailable
                      ? 'outlined'
                      : 'text'
                  }
                  disabled={!day.isAvailable}
                  onClick={() => handleSelectDay(parseInt(day.number))}
                  disableElevation
                >
                  <Typography variant='body2'>{day.number}</Typography>
                </Button>
              ))}
            </Box>
          </Card>
        </Stack>
        <Stack width='100%' px={1}>
          <Stack height={30} alignItems='center' direction='row'>
            <Typography variant='caption' textTransform='uppercase'>
              {currentDayFormatted !== 'Invalid Date'
                ? currentDayFormatted
                : 'Selecione uma data'}
            </Typography>
          </Stack>
          {currentDayFormatted !== 'Invalid Date' && (
            <Stack direction='row'>
              <Stack width='100%'>
                <Typography variant='caption'>Manhã</Typography>
                {getAvailableHours()?.morning?.map(hour => (
                  <Stack
                    direction='row'
                    alignItems='center'
                    key={hour?.id}
                    gap={1}
                  >
                    <Checkbox
                      size='small'
                      sx={{ margin: 0, padding: 0 }}
                      onChange={() => handleSelectedHour(hour?.hour, 'am')}
                      checked={
                        selectedHour?.hour === hour?.hour &&
                        selectedHour?.type === 'am'
                      }
                      checkedIcon={<RadioButtonCheckedIcon />}
                      icon={<RadioButtonUncheckedIcon />}
                    />
                    <Typography variant='body2'>{hour?.hour}</Typography>
                  </Stack>
                ))}
              </Stack>
              <Stack width='100%'>
                <Typography variant='caption'>Tarde</Typography>
                {getAvailableHours()?.afternoon?.map(hour => (
                  <Stack
                    direction='row'
                    alignItems='center'
                    key={hour.id}
                    gap={1}
                  >
                    <Checkbox
                      onChange={() => handleSelectedHour(hour?.hour, 'am')}
                      size='small'
                      sx={{ margin: 0, padding: 0 }}
                      checked={
                        selectedHour?.hour === hour?.hour &&
                        selectedHour?.type === 'am'
                      }
                      checkedIcon={<RadioButtonCheckedIcon />}
                      icon={<RadioButtonUncheckedIcon />}
                    />
                    <Typography variant='body2'>{hour?.hour}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  )
}
