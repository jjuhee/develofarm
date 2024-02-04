"use client"

import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import useCustomModalStore from "@/store/customModal"
import Button from "./ui/Button"

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

  useEffect(() => {
    if (viewCustomModal) {
      document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`
      return () => {
        const scrollY = document.body.style.top
        document.body.style.cssText = ""
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1)
      }
    }
  }, [viewCustomModal])

  if (!viewCustomModal) return null

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

  return mounted ? (
    ReactDOM.createPortal(
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
                placeholder="한줄 소개를 입력해주세여"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
              />
            )}

            <section className="w-full flex justify-around px-8">
              {modalType === "confirm" && (
                <Button
                  handler={cancelHandler}
                  text="취소"
                  type="border"
                  color="#297A5F"
                />
              )}
              <Button handler={confirmHandler} text="확인" color="#297A5F" />
            </section>
          </div>
        </div>
      </>,
      document.getElementById("portal") as HTMLElement,
    )
  ) : (
    <></>
  )
}

export default CustomModal
