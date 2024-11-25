import { LuCheckCircle2, LuCircleDashed, LuUserCog } from 'react-icons/lu'
import { Button } from '../../components/button'
import { useParams } from 'react-router-dom'
import { api } from '../../lib/axios'
import { useQuery } from '@tanstack/react-query'
import { Participant } from '../../types/trip'
import { ConfirmParticipantModal } from './confirm-participant-modal'
import { useModalStore } from '../../store/modal'

export const Guests = () => {
  const { tripId } = useParams()

  const { openConfirmParticipantModal } = useModalStore()

  const { data: participants } = useQuery<Participant[]>({
    queryKey: ['participants', tripId],
    queryFn: async () => {
      const response = await api.get(`/trips/${tripId}/participants`)

      return response.data.participants
    },
  })

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Convidados</h2>

      {/* Guest list */}
      <div className="space-y-5">
        {participants?.map((participant, index) => (
          <div
            key={participant.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {participant.name ?? `Convidado ${index}`}
              </span>
              <span className="block truncate text-sm text-zinc-400">
                {participant.email}
              </span>
            </div>
            {participant.is_confirmed ? (
              <LuCheckCircle2 className="size-5 shrink-0 text-lime-300" />
            ) : (
              <LuCircleDashed className="size-5 shrink-0 text-zinc-400" />
            )}
          </div>
        ))}
      </div>

      <Button
        variant="secondary"
        size="full"
        onClick={openConfirmParticipantModal}
      >
        <LuUserCog className="size-5" />
        Gerenciar convidados
      </Button>

      <ConfirmParticipantModal />
    </div>
  )
}
