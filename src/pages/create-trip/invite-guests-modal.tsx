import * as Dialog from '@radix-ui/react-dialog'
import { FormEvent } from 'react'
import { LuAtSign, LuPlus, LuX } from 'react-icons/lu'
import { Button } from '../../components/button'
import { useCreateTripStore } from '../../store/create-trip'
import { useModalStore } from '../../store/modal'

export const InviteGuestsModal = () => {
  const { isGuestsModalOpen, closeGuestsModal } = useModalStore()
  const { emailsToInvite, setEmailsToInvite } = useCreateTripStore()

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([...emailsToInvite, email])

    event.currentTarget.reset()
  }

  function removeEmailFromInvite(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove,
    )

    setEmailsToInvite(newEmailList)
  }

  return (
    <Dialog.Root open={isGuestsModalOpen} onOpenChange={closeGuestsModal}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-[640px] -translate-x-1/2 -translate-y-1/2 space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-lg font-semibold">
                Selecionar convidados
              </Dialog.Title>
              <Dialog.Close className="text-zinc-400">
                <LuX className="size-5" />
              </Dialog.Close>
            </div>

            <Dialog.Description className="text-sm text-zinc-400">
              Os convidados irão receber e-mails para confirmar a participação
              na viagem.
            </Dialog.Description>
          </div>

          <div className="flex flex-wrap gap-2">
            {emailsToInvite.map((email) => (
              <div
                key={email}
                className="flex items-center gap-2 rounded-md bg-zinc-800 px-2.5 py-1.5"
              >
                <span className="text-zinc-300">{email}</span>
                <button
                  type="button"
                  onClick={() => removeEmailFromInvite(email)}
                  className="text-zinc-400"
                >
                  <LuX className="size-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="h-px w-full bg-zinc-800" />

          <form
            onSubmit={addNewEmailToInvite}
            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 p-2.5"
          >
            <div className="flex flex-1 items-center gap-2 px-2">
              <LuAtSign className="size-5 text-zinc-400" />

              <input
                type="email"
                name="email"
                placeholder="Digite o email do convidado"
                className="flex-1 bg-transparent text-lg placeholder-zinc-400"
              />
            </div>

            <Button type="submit">
              Convidar
              <LuPlus className="size-5" />
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
