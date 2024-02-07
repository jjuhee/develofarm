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

  useScrollEvent({ scrollYSize: 500, handler: setShowButton })

  const onClickWriteButton = () => {
    if (userId) {
      router.push("/write")
    } else {
      openLoginConfirmModal()
    }
  }

  return (
    <div className="fixed right-[30px] bottom-[110px] lg:right-[50px] lg:bottom-[50px] z-10">
      {showButton && (
        <Image
          src={"/images/top_button.png"}
          alt="top_button"
          width={65}
          height={65}
          onClick={scrollToTop}
          className={
            "w-[35px] h-[35px] lg:w-[65px] lg:h-[65px] cursor-pointer transition-all ease-in-out"
          }
        />
      )}

      {pathname !== "/write" && (
        <Image
          src={"/images/writing_button.png"}
          alt="top_button"
          width={65}
          height={65}
          onClick={onClickWriteButton}
          className="w-[35px] h-[35px] lg:w-[65px] lg:h-[65px] cursor-pointer"
        />
      )}
    </div>
  )
}

export default FloatingButton
