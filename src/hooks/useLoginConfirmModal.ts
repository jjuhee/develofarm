import React from "react"
import { useCustomModal } from "./useCustomModal"
import { useRouter } from "next/navigation"

const useLoginConfirmModal = () => {
  const { openCustomModalHandler } = useCustomModal()
  const router = useRouter()

  const openLoginConfirmModal = () =>
    openCustomModalHandler(
      `로그인이 필요합니다.
    로그인 페이지로 이동하시겠습니까?`,
      "confirm",
      () => {
        router.push("/signin")
      },
    )
  return openLoginConfirmModal
}

export default useLoginConfirmModal
