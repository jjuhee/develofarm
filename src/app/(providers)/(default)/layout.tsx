"use client"

import { PropsWithChildren } from "react"
import Header from "@/app/(providers)/(default)/_components/Header"
import Footer from "@/app/(providers)/(default)/_components/Footer"
import useCustomModalStore from "@/store/customModal"
import CustomModal from "@/components/CustomModal"
import FloatingButton from "@/components/ui/FloatingButton"
import Provider from "@/app/provider"

function ProvidersLayout({ children }: PropsWithChildren<{}>) {
  const { viewCustomModal } = useCustomModalStore((state) => state)

  return (
    <div className="flex flex-col">
      {/* <Provider> */}
      <Header />
      <div className="flex w-full">
        <div className="flex flex-col w-[1250px] my-0 mx-auto p-2">
          {children}
        </div>
      </div>
      <Footer />
      <FloatingButton mode={"default"} />
      {viewCustomModal && <CustomModal />}
      {/* </Provider> */}
    </div>
  )
}

export default ProvidersLayout
