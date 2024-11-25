import * as Dialog from '@radix-ui/react-dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FormEvent, useState } from 'react'
import { LuCalendar, LuClock, LuTag, LuX } from 'react-icons/lu'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '../../components/button'
import { api } from '../../lib/axios'
import { useModalStore } from '../../store/modal'
import { Trip } from '../../types/trip'
import { TimePicker } from '../../components/time-picker'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'

export const CreateActivityModal = () => {
  const { tripId } = useParams()

  const queryClient = useQueryClient()
  const { isCreateActivityModalOpen, closeCreateActivityModal } =
    useModalStore()

  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')
  const [date, setDate] = useState<Date | undefined>()
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const { data: trip } = useQuery<Trip>({
    queryKey: ['trip', tripId],
  })

  const { mutateAsync: createActivityMutation } = useMutation({
    mutationFn: async ({
      title,
      occurs_at,
    }: {
      title: string
      occurs_at: string
    }) => {
      await api.post(`/trips/${tripId}/activities`, {
        title,
        occurs_at,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities', tripId] })

      toast.success('Atividade criada com sucesso!')

      handleCloseModal()
    },
  })

  function handleCloseModal() {
    setTitle('')
    setDate(undefined)
    setTime('')
    closeCreateActivityModal()
  }

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title) {
      return toast.error('Por favor, preencha o campo de título')
    }

    if (!date) {
      return toast.error('Por favor, preencha o campo de data')
    }

    if (!time) {
      return toast.error('Por favor, preencha o campo de hora')
    }

    const occurs_at = format(new Date(date), 'yyyy-MM-dd') + 'T' + time

    if (!trip?.starts_at || !trip?.ends_at) {
      toast.error('Data da viagem não encontrada')
      return
    }

    if (
      new Date(occurs_at) < new Date(trip?.starts_at) ||
      new Date(occurs_at) > new Date(trip?.ends_at)
    ) {
      return toast.error(
        'A data da atividade deve estar entre a data inicial e a data final da viagem',
      )
    }

    await createActivityMutation({ title, occurs_at })
  }

  const displayedDate = date ? format(date, "d' de 'LLL") : null

  return (
    <Dialog.Root
      open={isCreateActivityModalOpen}
      onOpenChange={handleCloseModal}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-[640px] -translate-x-1/2 -translate-y-1/2 space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-lg font-semibold">
                Cadastrar a atividade
              </Dialog.Title>
              <Dialog.Close className="text-zinc-400">
                <LuX className="size-5" />
              </Dialog.Close>
            </div>

            <Dialog.Description className="text-sm text-zinc-400">
              Todos os convidados podem visualizar as atividades
            </Dialog.Description>
          </div>

          <form onSubmit={createActivity} className="space-y-3">
            {/* Title input */}
            <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-5">
              <LuTag className="size-5 text-zinc-400" />

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Qual a atividade?"
                className="flex-1 bg-transparent text-lg placeholder-zinc-400"
              />
            </div>

            {/* Date and Time input */}
            <div className="flex gap-3">
              {/* Date input */}
              <div className="flex h-14 flex-1 items-center rounded-lg border border-zinc-800 bg-zinc-950 px-5">
                <button
                  type="button"
                  onClick={openDatePicker}
                  className="flex items-center gap-2"
                >
                  <LuCalendar className="size-5 text-zinc-400" />
                  <span className="flex-1 text-lg text-zinc-400">
                    {displayedDate || 'Quando?'}
                  </span>
                </button>

                {/* DatePicker modal */}
                {isDatePickerOpen && (
                  <div className="items fixed inset-0 flex items-center justify-center">
                    <div className="space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h2 className="text-lg font-semibold">
                            Selecione a data
                          </h2>
                          <button
                            onClick={closeDatePicker}
                            className="text-zinc-400"
                          >
                            <LuX className="size-5" />
                          </button>
                        </div>
                      </div>

                      <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Time input */}
              <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-5">
                <LuClock className="size-5 text-zinc-400" />

                <TimePicker time={time} setTime={setTime}>
                  <span className="text-lg text-zinc-400">
                    {time || 'Horário'}
                  </span>
                </TimePicker>
              </div>
            </div>

            <Button size="full" type="submit">
              Salvar atividade
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
