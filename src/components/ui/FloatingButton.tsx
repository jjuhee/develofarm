"use client"

import scrollToTop from "@/utils/scrollTop"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"

interface Props {
  mode?: string
}

const FloatingButton = ({ mode }: Props) => {
  const pathname = usePathname()
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handlerShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener("scroll", handlerShowButton)

    return () => {
      window.removeEventListener("scroll", handlerShowButton)
    }
  }, [])

  return (
    <div className="fixed right-[40px] bottom-[40px] ">
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

      {mode === "default" && pathname !== "/write" && (
        <Link href={"/write"}>
          <Image
            src={"/images/writing_button.png"}
            alt="top_button"
            width={70}
            height={70}
          />
        </Link>
      )}
    </div>
  )
}

export default FloatingButton
