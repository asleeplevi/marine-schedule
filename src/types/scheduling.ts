export type SchedulingInteresteds = {
  identifier: string
  name: string
  service: string
  gru: number
}

export type Scheduling = {
  organization: {
    nidom: string
    name: string
  }
  forwardingAgent: {
    name: string
    identifier: string
  }
  interesteds: SchedulingInteresteds[]
  date?: Date
  captcha?: string
}
