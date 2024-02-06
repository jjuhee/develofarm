"use client"

import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import useCustomModalStore from "@/store/customModal"
import Button from "./ui/Button"
import useScrollLock from "@/hooks/useScrollLock"

const CustomModal = () => {
  const {
    modalMessage,
    isInput,
    modalType,
    viewCustomModal,
    setViewCustomModal,
    handler,
  } = useCustomModalStore((state) => state)

  const [input, setInput] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useScrollLock(viewCustomModal)

  /** 확인 핸들러 */
  const confirmHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target === e.currentTarget) {
      setViewCustomModal(false)

      if (!handler) return

      /** input 값 유무 */
      if (input) {
        handler(input)
        setInput("")
      } else {
        handler()
      }
    }
  }

  /** 취소 핸들러 */
  const cancelHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target === e.currentTarget) {
      setViewCustomModal(false)
    }
  }

  if (!viewCustomModal) return null

  if (!mounted) return <></>

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex bg-black bg-opacity-50 z-100" />
      <div className="fixed top-[50%] left-[50%] flex transform: translate-x-[-50%] translate-y-[-50%] p-[50px] w-[450px] h-[260px] bg-white z-200 rounded-3xl">
        <div className="w-full h-full flex flex-col justify-around items-center">
          <h3 className="text-[20px] font-[600] whitespace-pre-line text-center">
            {modalMessage}
          </h3>
          {isInput && (
            <input
              type="text"
              placeholder="한줄 소개를 입력해주세요"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
          )}

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
