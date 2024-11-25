import { LuPlus } from 'react-icons/lu'
import { CreateActivityModal } from './create-activity-modal'
import { ImportanteLinks } from './important-links'
import { Guests } from './guests'
import { Activities } from './activities'
import { DestinationAndDateHeader } from './destinatination-and-date-header'
import { Button } from '../../components/button'
import { useModalStore } from '../../store/modal'

export function TripDetailsPage() {
  const { openCreateActivityModal } = useModalStore()

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      {/* Header */}
      <DestinationAndDateHeader />

      {/* Page content */}
      <main className="flex gap-16 px-4">
        {/* Left section */}
        <div className="flex-1 space-y-6">
          {/* Activities header */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>

            <Button onClick={openCreateActivityModal}>
              <LuPlus className="size-5" />
              Cadastrar atividade
            </Button>
          </div>

          {/* Activities list */}
          <Activities />
        </div>

        {/* Right section */}
        <div className="w-80 space-y-6">
          <ImportanteLinks />

          <div className="h-px w-full bg-zinc-800" />

          <Guests />
        </div>
      </main>

      <CreateActivityModal />
    </div>
  )
}
