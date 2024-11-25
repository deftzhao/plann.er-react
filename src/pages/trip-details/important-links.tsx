import { LuLink2, LuPlus } from 'react-icons/lu'
import { Button } from '../../components/button'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/axios'
import { Link } from '../../types/trip'
import { useModalStore } from '../../store/modal'
import { CreateLinkModal } from './create-link-modal'

export const ImportanteLinks = () => {
  const { tripId } = useParams()

  const { openCreateLinkModal } = useModalStore()

  const { data: links } = useQuery<Link[]>({
    queryKey: ['links', tripId],
    queryFn: async () => {
      const response = await api.get(`/trips/${tripId}/links`)

      return response.data.links
    },
  })

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links importantes</h2>

      {/* Links list */}
      <div className="space-y-5">
        {links?.length === 0 && (
          <p className="text-sm text-zinc-500">Nenhum link encontrado</p>
        )}
        {links?.map((link) => (
          <div
            key={link.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {link.title}
              </span>
              <a
                href={link.url}
                target="_blank"
                className="block truncate text-xs text-zinc-400 transition-colors hover:text-zinc-200"
                rel="noreferrer"
              >
                {link.url}
              </a>
            </div>
            <LuLink2 className="size-5 shrink-0 text-zinc-400" />
          </div>
        ))}
      </div>

      <Button variant="secondary" size="full" onClick={openCreateLinkModal}>
        <LuPlus className="size-5" />
        Cadastrar novo link
      </Button>

      <CreateLinkModal />
    </div>
  )
}
