import { create } from "zustand"

type TCustomModalType = {
  viewCustomModal: boolean
  setViewCustomModal: (viewCustomModal: boolean) => void
  modalType: string
  setModalType: (modalType: string) => void
  modalMessage: string
  setModalMessage: (modalMessage: string) => void
  isInput: boolean | null | undefined
  setIsInput: (isInput: boolean | null | undefined) => void
  handler?: (message?: string) => void // New field for handler
  setHandler: (handler?: (message?: string) => void) => void // Setter for handler
}

const useCustomModalStore = create<TCustomModalType>()((set) => ({
  viewCustomModal: false,
  setViewCustomModal: (viewCustomModal) => set({ viewCustomModal }),
  modalType: "",
  setModalType: (modalType) => set({ modalType }),
  modalMessage: "",
  setModalMessage: (modalMessage) => set({ modalMessage }),
  isInput: null,
  setIsInput: (isInput) => set({ isInput }),
  handler: undefined, // Initialize handler as undefined
  setHandler: (handler) => set({ handler }), // Setter for handler
}))

export default useCustomModalStore
