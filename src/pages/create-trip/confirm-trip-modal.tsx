import * as Dialog from '@radix-ui/react-dialog'
import { format } from 'date-fns'
import { FormEvent, useState } from 'react'
import { LuLoader2, LuMail, LuUser, LuX } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '../../components/button'
import { api } from '../../lib/axios'
import { useCreateTripStore } from '../../store/create-trip'
import { useModalStore } from '../../store/modal'

export const ConfirmTripModal = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const { isConfirmTripModalOpen, closeConfirmTripModal } = useModalStore()
  const {
    destination,
    eventStartAndEndDates,
    emailsToInvite,
    ownerName,
    ownerEmail,
    setOwnerName,
    setOwnerEmail,
  } = useCreateTripStore()

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!destination) {
      return
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return
    }

    if (!ownerName) {
      return toast.error('Por favor, preencha o campo de nome')
    }

    if (!ownerEmail) {
      return toast.error('Por favor, preencha o campo de e-mail')
    }

    try {
      setIsLoading(true)

      const response = await api.post('/trips', {
        destination,
        starts_at: eventStartAndEndDates.from,
        ends_at: eventStartAndEndDates.to,
        emails_to_invite: emailsToInvite,
        owner_name: ownerName,
        owner_email: ownerEmail,
      })

      const { tripId } = response.data

      navigate(`/trips/${tripId}`)
    } catch (error) {
      toast.error('Erro ao criar viagem')
    } finally {
      setIsLoading(false)
    }
  }

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d' de 'LLL")
          .concat(' até ')
          .concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
      : null

  return (
    <Dialog.Root
      open={isConfirmTripModalOpen}
      onOpenChange={closeConfirmTripModal}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-[640px] -translate-x-1/2 -translate-y-1/2 space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-lg font-semibold">
                Confirmar criação de viagem
              </Dialog.Title>
              <Dialog.Close className="text-zinc-400">
                <LuX className="size-5" />
              </Dialog.Close>
            </div>

            <Dialog.Description className="text-sm text-zinc-400">
              Para concluir a criação da viagem para{' '}
              <span className="font-semibold text-zinc-100">{destination}</span>{' '}
              nas datas de{' '}
              <span className="font-semibold text-zinc-100">
                {displayedDate}
              </span>{' '}
              preencha seus dados abaixo:
            </Dialog.Description>
          </div>

          <form onSubmit={createTrip} className="space-y-3">
            <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-5">
              <LuUser className="size-5 text-zinc-400" />

              <input
                name="name"
                placeholder="Seu nome completo"
                className="flex-1 bg-transparent text-lg placeholder-zinc-400"
                onChange={(e) => setOwnerName(e.target.value)}
              />
            </div>

            <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-5">
              <LuMail className="size-5 text-zinc-400" />

              <input
                type="email"
                name="email"
                placeholder="Seu email pessoal"
                className="flex-1 bg-transparent text-lg placeholder-zinc-400"
                onChange={(e) => setOwnerEmail(e.target.value)}
              />
            </div>

            <Button type="submit" size="full" disabled={isLoading}>
              {isLoading ? (
                <LuLoader2 className="size-5 animate-spin" />
              ) : (
                'Confirmar criação da viagem'
              )}
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
