import { create } from "zustand"

type TCustomModalType = {
  viewCustomModal: boolean
  setViewCustomModal: (viewCustomModal: boolean) => void
  modalResult: boolean
  setModalResult: (modalResult: boolean) => void
  modalType: string
  setModalType: (modalType: string) => void
  modalMessage: string
  setModalMessage: (modalMessage: string) => void
  handler?: () => void // New field for handler
  setHandler: (handler?: () => void) => void // Setter for handler
}

const useCustomModalStore = create<TCustomModalType>()((set) => ({
  viewCustomModal: false,
  setViewCustomModal: (viewCustomModal: boolean) =>
    set({ viewCustomModal: viewCustomModal }),
  modalResult: false,
  setModalResult: (modalResult: boolean) => set({ modalResult: modalResult }),
  modalType: "",
  setModalType: (modalType: string) => set({ modalType: modalType }),
  modalMessage: "",
  setModalMessage: (modalMessage: string) =>
    set({ modalMessage: modalMessage }),
  handler: undefined, // Initialize handler as undefined
  setHandler: (handler?: () => void) => set({ handler: handler }), // Setter for handler
}))

export default useCustomModalStore
