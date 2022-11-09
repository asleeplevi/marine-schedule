import { CardHeader, CardHeaderProps, Divider } from '@mui/material'

type CardTitleProps = {
  title: string
} & CardHeaderProps

export const CardTitle = ({ title, ...rest }: CardTitleProps) => {
  return (
    <>
      <CardHeader
        title={title}
        {...rest}
        titleTypographyProps={{
          ...rest.titleTypographyProps,
          sx: { fontSize: 14, ...rest?.titleTypographyProps?.sx },
        }}
      />
      <Divider />
    </>
  )
}
