import { useEffect, useRef } from 'react'
import { useIMask } from 'react-imask'
import IMask from 'imask'
import { StandardTextFieldProps } from '@mui/material'
import { BaseInput } from '../Input'
import { Field, FieldProps } from 'formik'

interface InputMaskProps extends Partial<StandardTextFieldProps> {
  name: string
  label: string
  withFormik?: boolean
  mask: IMask.AnyMaskedOptions
  onChangeValue?: (value: string, unmaskedValue: string) => void
}

export function InputMask({ withFormik = true, ...rest }: InputMaskProps) {
  if (withFormik) return <FormikInputMask {...rest} />
  else return <BaseInputMask {...rest} />
}

const BaseInputMask = ({
  mask,
  defaultValue,
  onChangeValue,
  ...rest
}: InputMaskProps) => {
  const { ref, value, unmaskedValue, setValue } = useIMask(
    mask as IMask.AllMaskedOptions
  )

  useEffect(() => {
    if (defaultValue) setValue(String(defaultValue))
  }, [defaultValue])

  useEffect(() => {
    if (onChangeValue) onChangeValue(value, unmaskedValue)
  }, [value])

  return <BaseInput inputRef={ref} {...rest} />
}

export function FormikInputMask({
  mask,
  defaultValue,
  name,
  ...rest
}: InputMaskProps) {
  const { ref, value, unmaskedValue, setValue } = useIMask(
    mask as IMask.AllMaskedOptions
  )
  const initialValue = useRef<string>()

  useEffect(() => {
    if (!value && defaultValue) setValue(String(defaultValue))
    else if (initialValue.current) {
      setValue(String(initialValue.current))
    }
  }, [defaultValue, initialValue.current])

  return (
    <Field name={name}>
      {({
        field: { value, ...field },
        form: { setFieldValue },
      }: FieldProps) => {
        initialValue.current = value
        return (
          <BaseInput
            {...rest}
            {...field}
            onKeyDown={() => setFieldValue(name, unmaskedValue)}
            inputRef={ref}
            defaultValue={value}
          />
        )
      }}
    </Field>
  )
}
