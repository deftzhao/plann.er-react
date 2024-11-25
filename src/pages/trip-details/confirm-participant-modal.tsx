import * as Dialog from '@radix-ui/react-dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FormEvent } from 'react'
import { LuLink2, LuLoader2, LuX } from 'react-icons/lu'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '../../components/button'
import { api } from '../../lib/axios'
import { useModalStore } from '../../store/modal'
import { Participant } from '../../types/trip'

export const ConfirmParticipantModal = () => {
  const { tripId } = useParams()

  const queryClient = useQueryClient()

  const { isConfirmParticipantModalOpen, closeConfirmParticipantModal } =
    useModalStore()

  const { data: participants } = useQuery<Participant[]>({
    queryKey: ['participants', tripId],
  })

  const { mutateAsync: confirmParticipantMutation, isPending } = useMutation({
    mutationFn: async ({ participantId }: { participantId: string }) => {
      await api.get(`/participants/${participantId}/confirm`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participants', tripId] })

      toast.success('Participante confirmado com sucesso!')

      closeConfirmParticipantModal()
    },
  })

  async function confirmParticipant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const participantEmail = data.get('email')?.toString()

    if (!participantEmail) {
      return
    }

    const participant = participants?.find(
      (participant) => participant.email === participantEmail,
    )

    if (!participant) {
      return toast.error('Convidado não encontrado')
    }

    const { id: participantId } = participant

    await confirmParticipantMutation({ participantId })
  }

  return (
    <Dialog.Root
      open={isConfirmParticipantModalOpen}
      onOpenChange={closeConfirmParticipantModal}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-[640px] -translate-x-1/2 -translate-y-1/2 space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-lg font-semibold">
                Confirmar participante
              </Dialog.Title>
              <Dialog.Close className="text-zinc-400">
                <LuX className="size-5" />
              </Dialog.Close>
            </div>

            <Dialog.Description className="text-sm text-zinc-400">
              Para confirmar o participante, insira o e-mail do convidado
            </Dialog.Description>
          </div>

          <form onSubmit={confirmParticipant} className="space-y-3">
            <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-5">
              <LuLink2 className="size-5 text-zinc-400" />

              <input
                type="email"
                name="email"
                placeholder="Insira o e-mail do convidado"
                className="flex-1 bg-transparent text-lg placeholder-zinc-400"
              />
            </div>

            <Button size="full" type="submit" disabled={isPending}>
              {isPending ? (
                <LuLoader2 className="size-5 animate-spin" />
              ) : (
                'Confirmar participante'
              )}
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
