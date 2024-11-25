export type Trip = {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

export type Activity = {
  date: string
  activities: {
    id: string
    title: string
    occurs_at: string
  }[]
}

export type Participant = {
  id: string
  name: string | null
  email: string
  is_confirmed: boolean
}

export type Link = {
  id: string
  title: string
  url: string
  trip_id: string
}
