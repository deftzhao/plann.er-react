import { create } from 'zustand'

type ModalState = {
  isGuestsInputOpen: boolean
  isGuestsModalOpen: boolean
  isConfirmTripModalOpen: boolean
  isCreateActivityModalOpen: boolean
  isCreateLinkModalOpen: boolean
  isUpdateTripModalOpen: boolean
  isConfirmParticipantModalOpen: boolean
  openGuestsInput: () => void
  closeGuestsInput: () => void
  openGuestsModal: () => void
  closeGuestsModal: () => void
  openConfirmTripModal: () => void
  closeConfirmTripModal: () => void
  openCreateActivityModal: () => void
  closeCreateActivityModal: () => void
  openCreateLinkModal: () => void
  closeCreateLinkModal: () => void
  openUpdateTripModal: () => void
  closeUpdateTripModal: () => void
  openConfirmParticipantModal: () => void
  closeConfirmParticipantModal: () => void
}

export const useModalStore = create<ModalState>((set) => ({
  isGuestsInputOpen: false,
  isGuestsModalOpen: false,
  isConfirmTripModalOpen: false,
  isCreateActivityModalOpen: false,
  isCreateLinkModalOpen: false,
  isUpdateTripModalOpen: false,
  isConfirmParticipantModalOpen: false,
  openGuestsInput: () => set({ isGuestsInputOpen: true }),
  closeGuestsInput: () => set({ isGuestsInputOpen: false }),
  openGuestsModal: () => set({ isGuestsModalOpen: true }),
  closeGuestsModal: () => set({ isGuestsModalOpen: false }),
  openConfirmTripModal: () => set({ isConfirmTripModalOpen: true }),
  closeConfirmTripModal: () => set({ isConfirmTripModalOpen: false }),
  openCreateActivityModal: () => set({ isCreateActivityModalOpen: true }),
  closeCreateActivityModal: () => set({ isCreateActivityModalOpen: false }),
  openCreateLinkModal: () => set({ isCreateLinkModalOpen: true }),
  closeCreateLinkModal: () => set({ isCreateLinkModalOpen: false }),
  openUpdateTripModal: () => set({ isUpdateTripModalOpen: true }),
  closeUpdateTripModal: () => set({ isUpdateTripModalOpen: false }),
  openConfirmParticipantModal: () =>
    set({ isConfirmParticipantModalOpen: true }),
  closeConfirmParticipantModal: () =>
    set({ isConfirmParticipantModalOpen: false }),
}))
