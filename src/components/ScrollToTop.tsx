"use client"

import { useParams } from "next/navigation"
import React, { useEffect } from "react"

const ScrollToTop = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return <>{children}</>
}

export default ScrollToTop
