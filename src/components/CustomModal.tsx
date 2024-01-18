"use client"

import React, { ReactNode, useEffect } from "react"
import ReactDOM from "react-dom"
import Spacer from "./ui/Spacer"
import useCustomModalStore from "@/store/customModal"
import Button from "./ui/Button"

const CustomModal = () => {
  const {
    setModalResult,
    modalMessage,
    modalType,
    viewCustomModal,
    setViewCustomModal,
    handler,
  } = useCustomModalStore((state) => state)

  useEffect(() => {
    return () => {
      setModalResult(false)
    }
  }, [])

  if (!viewCustomModal) return null

  /** 확인 핸들러 */
  const confirmHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target === e.currentTarget) {
      setModalResult(true)
      setViewCustomModal(false)

      if (!handler) return
      handler()
    }
  }

  /** 취소 핸들러 */
  const cancelHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target === e.currentTarget) {
      setModalResult(false)
      setViewCustomModal(false)
    }
  }

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-5" />
      <div className="fixed top-[50%] left-[50%] transform: translate-x-[-50%] translate-y-[-50%] p-[50px] w-[450px] h-[260px] bg-white z-5 rounded-3xl">
        <div className="w-full h-full flex flex-col justify-around">
          <h3 className="text-[20px] font-[600] whitespace-pre-line text-center">
            {modalMessage}
          </h3>
          <section className="w-full flex justify-around px-8">
            {modalType === "confirm" && (
              <Button handler={cancelHandler} text="취소" type="border" />
            )}
            <Button handler={confirmHandler} text="확인" />
          </section>
        </div>
      </div>
    </>,
    document.getElementById("portal") as HTMLElement,
  )
}

export default CustomModal
