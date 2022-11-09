import React, { FC } from 'react'
import { StandardTextFieldProps, TextField } from '@mui/material'
import { Field, FieldProps } from 'formik'

interface InputProps extends StandardTextFieldProps {
  name: string
  label: string
  shrink?: boolean
  withFormik?: boolean
}

export const Input: FC<InputProps> = ({ withFormik = true, ...rest }) => {
  if (withFormik) return <FormikInput {...rest} />
  else return <BaseInput {...rest} />
}

export const BaseInput = (props: InputProps) => {
  return <TextField fullWidth {...props} />
}

export const FormikInput: FC<InputProps> = ({ name, shrink, ...rest }) => {
  return (
    <Field name={name}>
      {({ field: { value, ...field } }: FieldProps) => (
        <BaseInput
          defaultValue={value}
          {...field}
          {...rest}
          InputLabelProps={{ shrink, ...rest.InputLabelProps }}
        />
      )}
    </Field>
  )
}
