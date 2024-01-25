"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

interface Props {
  children: React.ReactNode
}

const Provider = ({ children }: Props) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      {children}
    </QueryClientProvider>
  )
}

export default Provider
