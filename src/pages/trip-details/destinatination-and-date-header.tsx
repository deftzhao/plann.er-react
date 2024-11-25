import { LuMapPin, LuCalendar, LuSettings2 } from 'react-icons/lu'
import { Button } from '../../components/button'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { Trip } from '../../types/trip'
import { api } from '../../lib/axios'
import { useModalStore } from '../../store/modal'
import { UpdateTripModal } from './update-trip-modal'

export const DestinationAndDateHeader = () => {
  const { tripId } = useParams()

  const { openUpdateTripModal } = useModalStore()

  const { data: trip } = useQuery<Trip>({
    queryKey: ['trip', tripId],
    queryFn: async () => {
      const { data } = await api.get(`/trips/${tripId}`)

      return data.trip
    },
  })

  const displayedDate = trip
    ? format(trip.starts_at, "d' de 'LLL")
        .concat(' até ')
        .concat(format(trip.ends_at, "d' de 'LLL"))
    : null

  return (
    <div className="flex h-16 items-center justify-between rounded-xl bg-zinc-900 px-4 shadow-shape">
      {/* Left content */}
      <div className="flex items-center gap-2">
        <LuMapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>

      {/* Right content */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <LuCalendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <div className="h-6 w-px bg-zinc-800" />

        <Button variant="secondary" onClick={openUpdateTripModal}>
          Alterar local/data
          <LuSettings2 className="size-5" />
        </Button>
      </div>

      <UpdateTripModal />
    </div>
  )
}
