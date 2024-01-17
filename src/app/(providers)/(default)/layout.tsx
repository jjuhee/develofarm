"use client"

import { PropsWithChildren } from "react"
import Header from "@/app/(providers)/(default)/_components/Header"
import Footer from "@/app/(providers)/(default)/_components/Footer"
import useCustomModalStore from "@/store/customModal"
import CustomModal from "@/components/CustomModal"

function ProvidersLayout({ children }: PropsWithChildren<{}>) {
  const { viewCustomModal } = useCustomModalStore((state) => state)

  return (
    <>
      <Header />
      <div className="flex w-full">
        <div className="flex flex-col w-[1250px] my-0 mx-auto p-2">
          {children}
        </div>
      </div>
      <Footer />
      {viewCustomModal && <CustomModal />}
    </>
  )
}

export default ProvidersLayout
