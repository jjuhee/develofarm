import useCustomModalStore from "@/store/customModal"

export const useCustomModal = () => {
  const {
    setModalMessage,
    setIsInput,
    setModalType,
    setViewCustomModal,
    setHandler,
  } = useCustomModalStore((state) => state)

  const openCustomModalHandler = (
    message: string,
    type: string,
    handler?: (message?: string) => void,
    input?: boolean | null,
  ) => {
    setViewCustomModal(true)
    setModalMessage(message)
    setIsInput(input)
    setModalType(type)

    setHandler(handler)
  }

  return { openCustomModalHandler }
}
