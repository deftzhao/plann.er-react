import * as Dialog from '@radix-ui/react-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormEvent, useState } from 'react'
import { LuCalendar, LuLoader2, LuMapPin, LuX } from 'react-icons/lu'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '../../components/button'
import { api } from '../../lib/axios'
import { useModalStore } from '../../store/modal'
import { DateRange, DayPicker } from 'react-day-picker'
import { format } from 'date-fns'

export const UpdateTripModal = () => {
  const queryClient = useQueryClient()
  const { tripId } = useParams()

  const { isUpdateTripModalOpen, closeUpdateTripModal } = useModalStore()

  const [destination, setDestination] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >()
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const { mutateAsync: updateTripMutation, isPending } = useMutation({
    mutationFn: async () => {
      const response = await api.put(`/trips/${tripId}`, {
        destination,
        starts_at: eventStartAndEndDates?.from,
        ends_at: eventStartAndEndDates?.to,
      })

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities', tripId] })
      queryClient.invalidateQueries({ queryKey: ['trip', tripId] })

      toast.success('Viagem atualizada com sucesso!')

      setIsDatePickerOpen(false)
      setDestination('')
      setEventStartAndEndDates(undefined)

      closeUpdateTripModal()
    },
  })

  function handleCloseModal() {
    setDestination('')
    setEventStartAndEndDates(undefined)
    closeUpdateTripModal()
  }

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }

  async function updateTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!destination) {
      return toast.error('Por favor, preencha o campo de destino')
    }

    if (
      !eventStartAndEndDates ||
      !eventStartAndEndDates.from ||
      !eventStartAndEndDates.to
    ) {
      return toast.error('Por favor, preencha o campo de data')
    }

    if (eventStartAndEndDates.from < new Date()) {
      return toast.error('A data inicial deve ser posterior a data atual')
    }

    await updateTripMutation()
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
    <Dialog.Root open={isUpdateTripModalOpen} onOpenChange={handleCloseModal}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-[640px] -translate-x-1/2 -translate-y-1/2 space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-lg font-semibold">
                Atualizar viagem
              </Dialog.Title>
              <Dialog.Close className="text-zinc-400">
                <LuX className="size-5" />
              </Dialog.Close>
            </div>

            <Dialog.Description className="text-sm text-zinc-400">
              Atualize as informações da sua viagem
            </Dialog.Description>
          </div>

          <form onSubmit={updateTrip} className="space-y-3">
            <div className="flex h-14 flex-1 gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-5">
                <LuMapPin className="size-5 text-zinc-400" />
                <input
                  onChange={(e) => setDestination(e.target.value)}
                  type="text"
                  placeholder="Novo destino"
                  className="flex-1 bg-transparent text-lg placeholder-zinc-400"
                />
              </div>

              <button
                type="button"
                onClick={openDatePicker}
                className="flex flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-5 text-left"
              >
                <LuCalendar className="size-5 text-zinc-400" />
                <span className="w-40 flex-1 text-lg text-zinc-400">
                  {displayedDate || 'Quando?'}
                </span>
              </button>
            </div>

            <Button size="full" type="submit" disabled={isPending}>
              {isPending ? (
                <LuLoader2 className="size-5 animate-spin" />
              ) : (
                'Atualizar viagem'
              )}
            </Button>
          </form>
          {/* DatePicker modal */}
          {isDatePickerOpen && (
            <div className="items fixed inset-0 flex items-center justify-center">
              <div className="space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Selecione a data</h2>
                    <button onClick={closeDatePicker} className="text-zinc-400">
                      <LuX className="size-5" />
                    </button>
                  </div>
                </div>

                <DayPicker
                  mode="range"
                  selected={eventStartAndEndDates}
                  onSelect={setEventStartAndEndDates}
                />
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
