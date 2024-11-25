import * as Dialog from '@radix-ui/react-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormEvent } from 'react'
import { LuLink2, LuLoader2, LuTag, LuX } from 'react-icons/lu'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '../../components/button'
import { api } from '../../lib/axios'
import { useModalStore } from '../../store/modal'

export const CreateLinkModal = () => {
  const queryClient = useQueryClient()
  const { isCreateLinkModalOpen, closeCreateLinkModal } = useModalStore()

  const { tripId } = useParams()

  const { mutateAsync: createLinkMutation, isPending } = useMutation({
    mutationFn: async ({ title, url }: { title: string; url: string }) => {
      await api.post(`/trips/${tripId}/links`, {
        title,
        url,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links', tripId] })

      toast.success('Link cadastrado com sucesso!')

      closeCreateLinkModal()
    },
  })

  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const title = data.get('title')?.toString()
    const url = data.get('url')?.toString()

    if (!title) {
      return toast.error('Por favor, preencha o campo de título')
    }

    if (!url) {
      return toast.error('Por favor, preencha o campo de URL')
    }

    await createLinkMutation({ title, url })
  }

  return (
    <Dialog.Root
      open={isCreateLinkModalOpen}
      onOpenChange={closeCreateLinkModal}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-[640px] -translate-x-1/2 -translate-y-1/2 space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-lg font-semibold">
                Cadastrar link
              </Dialog.Title>
              <Dialog.Close className="text-zinc-400">
                <LuX className="size-5" />
              </Dialog.Close>
            </div>

            <Dialog.Description className="text-sm text-zinc-400">
              Todos os convidados podem visualizar os links importantes
            </Dialog.Description>
          </div>

          <form onSubmit={createLink} className="space-y-3">
            <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-5">
              <LuTag className="size-5 text-zinc-400" />

              <input
                name="title"
                placeholder="Título do link"
                className="flex-1 bg-transparent text-lg placeholder-zinc-400"
              />
            </div>

            <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-5">
              <LuLink2 className="size-5 text-zinc-400" />

              <input
                type="url"
                name="url"
                placeholder="URL"
                className="flex-1 bg-transparent text-lg placeholder-zinc-400"
              />
            </div>

            <Button size="full" type="submit" disabled={isPending}>
              {isPending ? (
                <LuLoader2 className="size-5 animate-spin" />
              ) : (
                'Salvar link'
              )}
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
