"use client"

import useLoginConfirmModal from "@/hooks/useLoginConfirmModal"
import useScrollEvent from "@/hooks/useScrollEvent"
import useUserStore from "@/store/user"
import scrollToTop from "@/utils/scrollTop"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import React, { useState } from "react"

const FloatingButton = () => {
  const pathname = usePathname()
  const router = useRouter()
  const userId = useUserStore((state) => state.user?.id)
  const [showButton, setShowButton] = useState(false)
  const openLoginConfirmModal = useLoginConfirmModal()

  useScrollEvent({ scrollYSize: 200, handler: setShowButton })

  const onClickWriteButton = () => {
    if (userId) {
      router.push("/write")
    } else {
      openLoginConfirmModal()
    }
  }

  return (
    <div className="fixed right-[20px] bottom-[80px] lg:right-[30px] lg:bottom-[50px] z-10">
      {showButton && (
        <Image
          src={"/images/top_button.png"}
          alt="top_button"
          width={65}
          height={65}
          onClick={scrollToTop}
          className={
            "w-[50px] h-[50px] lg:w-[65px] lg:h-[65px] cursor-pointer transition-all ease-in-out"
          }
        />
      )}

      {pathname !== "/write" && (
        <Image
          src={"/images/writing_button.png"}
          alt="write_button"
          width={65}
          height={65}
          onClick={onClickWriteButton}
          className="w-[50px] h-[50px] lg:w-[65px] lg:h-[65px] cursor-pointer"
        />
      )}
    </div>
  )
}

export default FloatingButton
