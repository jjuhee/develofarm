"use client"

import useLoginConfirmModal from "@/hooks/useLoginConfirmModal"
import useScrollEvent from "@/hooks/useScrollEvent"
import useUserStore from "@/store/user"
import scrollToTop from "@/utils/scrollTop"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

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
    <div className="fixed right-[50px] bottom-[50px] z-10 hidden lg:block">
      {showButton && (
        <Image
          src={"/images/top_button.png"}
          alt="top_button"
          width={70}
          height={70}
          onClick={scrollToTop}
          className={`cursor-pointer transition-all ease-in-out  
        }`}
        />
      )}

      {pathname !== "/write" && (
        <Image
          src={"/images/writing_button.png"}
          alt="top_button"
          width={70}
          height={70}
          onClick={onClickWriteButton}
          className="cursor-pointer"
        />
      )}
    </div>
  )
}

export default FloatingButton
