import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode, useState } from 'react'
import { LuX } from 'react-icons/lu'
import { Button } from '../button'

type TimePickerProps = {
  time: string
  setTime: (time: string) => void
  children?: ReactNode
}

export const TimePicker = ({ children, setTime }: TimePickerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [localTime, setLocalTime] = useState('')

  const confirmTime = () => {
    setTime(localTime)
    setIsOpen(false)
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild className="cursor-pointer">
        {children}
      </Dialog.Trigger>

      <Dialog.Overlay className="fixed inset-0 bg-black/60" />

      <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-[320px] -translate-x-1/2 -translate-y-1/2 space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="flex items-center justify-between">
          <Dialog.Title className="text-lg font-semibold">
            Escolha o horário
          </Dialog.Title>
          <Dialog.Close className="text-zinc-400">
            <LuX className="size-5" />
          </Dialog.Close>
        </div>
        <div>
          <input
            type="time"
            value={localTime}
            onChange={(e) => setLocalTime(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 p-3 text-xl text-zinc-100 outline-none"
          />
        </div>
        <Button className="w-full" type="button" onClick={confirmTime}>
          Confirmar
        </Button>
      </Dialog.Content>
    </Dialog.Root>
  )
}
