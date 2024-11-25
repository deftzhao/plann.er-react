import { LuArrowRight, LuUserPlus2 } from 'react-icons/lu'
import { Button } from '../../../components/button'
import { useModalStore } from '../../../store/modal'
import { useCreateTripStore } from '../../../store/create-trip'

export const InviteGuestsStep = () => {
  const { openGuestsModal, openConfirmTripModal } = useModalStore()
  const { emailsToInvite } = useCreateTripStore()

  return (
    <div className="flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape">
      <button
        type="button"
        onClick={openGuestsModal}
        className="flex flex-1 items-center gap-2 text-left"
      >
        <LuUserPlus2 className="size-5 text-zinc-400" />
        {emailsToInvite.length > 0 ? (
          <span className="flex-1 text-lg text-zinc-100">
            {emailsToInvite.length} pessoa(s) convidada(s)
          </span>
        ) : (
          <span className="flex-1 text-lg text-zinc-400">
            Quem estará na viagem?
          </span>
        )}
      </button>

      <div className="h-6 w-px bg-zinc-800" />

      <Button onClick={openConfirmTripModal}>
        Confirmar viagem
        <LuArrowRight className="size-5" />
      </Button>
    </div>
  )
}
