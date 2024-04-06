import { create } from 'zustand'

interface AuthModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export const useLoginModal = create<AuthModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export const useRegisterModal = create<AuthModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))