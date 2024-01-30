"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { useEffect } from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

interface Props {
  children: React.ReactNode
}

const Provider = ({ children }: Props) => {
  const queryClient = new QueryClient()
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      // Kakao SDK 초기화
      window.Kakao.init("f0f7e9022ec743430c375f76e7dc9d47")
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      {children}
    </QueryClientProvider>
  )
}

export default Provider
