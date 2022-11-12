import { useState } from 'react'
import { IntestedCard } from './CardItem'
import { Services } from '@/ipc/functions/getServices'

export type InterestedsProps = {
  identifier: string
  name: string
  gru: number
  service: string
}

type IntestedCardProps = {
  interesteds: InterestedsProps[]
  services: { [key: number]: Services[] }
  onDelete: (index: number) => void
  handleUpdateInterested: (fields: InterestedsProps, index: number) => void
}

export const IntestedsList = ({
  interesteds,
  onDelete,
  handleUpdateInterested,
  services,
}: IntestedCardProps) => {
  const [openedInteresteds, setOpenedInteresteds] = useState<number[]>([])

  const handeExpandInterested = (index: number) => {
    if (openedInteresteds.includes(index))
      setOpenedInteresteds(interesteds =>
        interesteds.filter(interested => interested !== index)
      )
    else setOpenedInteresteds(interesteds => [...interesteds, index])
  }

  return (
    <>
      {interesteds.map((interested, index) => (
        <IntestedCard
          key={index}
          index={index}
          services={services}
          interested={interested}
          handleUpdateInterested={handleUpdateInterested}
          handeExpandInterested={handeExpandInterested}
          openedInteresteds={openedInteresteds}
          onDelete={onDelete}
        />
      ))}
    </>
  )
}
