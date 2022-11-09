import { MouseEvent, ReactNode, useMemo } from 'react'
import { useField } from 'formik'
import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps,
  AutocompleteRenderInputParams,
  TextField,
} from '@mui/material'

type MuiAutocompleteBaseProps<T> = Omit<
  MuiAutocompleteProps<T, boolean, undefined, boolean>,
  'renderInput' | 'getOptionLabel'
>

interface AutocompleteWithoutProps<T> extends MuiAutocompleteBaseProps<T> {
  name?: never
  withFormik: false
  getOptionValue?: never
  label?: string
  getOptionLabel: (option: T) => string
  renderInput?: (params: AutocompleteRenderInputParams) => ReactNode
}

interface AutocompleteWithFormikProps<T> extends MuiAutocompleteBaseProps<T> {
  name: string
  withFormik?: true
  label?: string
  option?: {
    label?: keyof T
    value?: keyof T
    key?: string
  }
  renderInput?: (params: AutocompleteRenderInputParams) => ReactNode
  getOptionLabel?: (option: T) => string
  getOptionValue?: (option: T) => any
}

type AutocompleteProps<T> =
  | AutocompleteWithoutProps<T>
  | AutocompleteWithFormikProps<T>

export function Autocomplete<T>({
  withFormik = true,
  name,
  getOptionValue,
  ...rest
}: AutocompleteProps<T>) {
  if (withFormik) {
    return (
      <FormikAutocomplete
        name={name as string}
        getOptionValue={getOptionValue as any}
        {...(rest as any)}
      />
    )
  } else return <BaseInput {...(rest as AutocompleteWithoutProps<T>)} />
}

function BaseInput<T>(props: Omit<AutocompleteWithoutProps<T>, 'withFormik'>) {
  return (
    <MuiAutocomplete
      fullWidth
      renderInput={params => <TextField label={props.label} {...params} />}
      {...(props as any)}
    />
  )
}

function FormikAutocomplete<T extends Record<string, any>>({
  getOptionValue,
  option,
  ...props
}: Omit<AutocompleteWithFormikProps<T>, 'withFormik'>) {
  const [{ value: defaultValue, ...field }, , { setValue }] = useField({
    name: props.name,
  })

  const defaultOption = useMemo(() => {
    const key = option?.key
    if (key) return props.options.find(option => option[key] === defaultValue)
    else
      return props.options.find(
        (option: any) => Object.values(option)[0] === defaultValue
      )
  }, [])

  const onChange = (_: MouseEvent, newValue: T) => {
    const value = option?.value
    if (getOptionValue) {
      setValue(getOptionValue(newValue))
    } else if (value) {
      setValue(newValue[value])
    } else setValue(newValue)
  }

  const getOptionLabel = (item: T) => {
    if (props?.getOptionLabel) return props.getOptionLabel(item)
    else if (option?.label) return String(item[option.label])
    return '[getOptionLabel] error'
  }

  const isOptionEqualToValue = (a: T, b: T) => {
    const key = option?.key
    if (props?.isOptionEqualToValue) return props.isOptionEqualToValue(a, b)
    else if (key) return a[key] === b[key]
    return Object.values(a)[0] === Object.values(b)[0]
  }

  return (
    <MuiAutocomplete
      getOptionLabel={getOptionLabel as any}
      renderInput={params => (
        <TextField {...params} {...field} label={props.label} />
      )}
      defaultValue={defaultOption as unknown as any}
      onChange={onChange as unknown as any}
      isOptionEqualToValue={isOptionEqualToValue}
      {...props}
    />
  )
}
