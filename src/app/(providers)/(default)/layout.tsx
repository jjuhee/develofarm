"use client"
import { PropsWithChildren, useEffect, useState } from "react"
import Header from "@/app/(providers)/(default)/_components/Header"
import Footer from "@/app/(providers)/(default)/_components/Footer"
import useLoginConfirmModal from "@/hooks/useLoginConfirmModal"
import { useRouter } from "next/navigation"

function ProvidersLayout({ children }: PropsWithChildren<{}>) {
  const openLoginConfirmModal = useLoginConfirmModal()
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const accessToken = localStorage.getItem(
      process.env.NEXT_PUBLIC_AUTH_TOKEN as string,
    )
    if (accessToken === null) {
      openLoginConfirmModal()
      router.replace("/")
    } else {
      setIsLogin(true)
    }
  }, [])

  return (
    <>
      {isLogin && (
        <div className="flex flex-col h-full w-full">
          <Header />
          <div className="flex flex-col w-full h-[100vh] justify-between">
            <div className="flex flex-col max-w-[1200px] w-full mx-auto p-2 mb-20">
              {children}
            </div>
            <Footer />
          </div>
        </div>
      )}
    </>
  )
}

export default ProvidersLayout
