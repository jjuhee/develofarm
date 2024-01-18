import useCustomModalStore from "@/store/customModal"

export const useCustomModal = () => {
  const { setModalMessage, setModalType, setViewCustomModal, setHandler } =
    useCustomModalStore((state) => state)

  const openCustomModalHandler = (
    message: string,
    type: string,
    handler?: () => void,
  ) => {
    setViewCustomModal(true)
    setModalMessage(message)
    setModalType(type)

    setHandler(handler)
  }

  return { openCustomModalHandler }
}
