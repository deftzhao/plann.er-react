import { DateRange } from 'react-day-picker'
import { create } from 'zustand'

type CreateTripState = {
  destination: string
  ownerName: string
  ownerEmail: string
  emailsToInvite: string[]
  eventStartAndEndDates: DateRange | undefined
  setDestination: (destination: string) => void
  setOwnerName: (ownerName: string) => void
  setOwnerEmail: (ownerEmail: string) => void
  setEmailsToInvite: (emailsToInvite: string[]) => void
  setEventStartAndEndDates: (
    eventStartAndEndDates: DateRange | undefined,
  ) => void
}

export const useCreateTripStore = create<CreateTripState>((set) => ({
  destination: '',
  ownerName: '',
  ownerEmail: '',
  emailsToInvite: [],
  eventStartAndEndDates: undefined,
  setDestination: (destination: string) => set({ destination }),
  setOwnerName: (ownerName: string) => set({ ownerName }),
  setOwnerEmail: (ownerEmail: string) => set({ ownerEmail }),
  setEmailsToInvite: (emailsToInvite: string[]) => set({ emailsToInvite }),
  setEventStartAndEndDates: (eventStartAndEndDates: DateRange | undefined) =>
    set({ eventStartAndEndDates }),
}))
