import { PropsWithChildren } from "react"
import Header from "@/app/(providers)/(feature)/_components/Header"
import Footer from "@/app/(providers)/(feature)/_components/Footer"
import FloatingButton from "@/components/ui/FloatingButton"
import CustomModal from "@/components/CustomModal"

function ProvidersLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex w-full h-full justify-between">
        <div className="flex flex-col w-[1250px] mx-auto">{children}</div>
        <Footer />
      </div>
      <FloatingButton />
      <CustomModal />
    </div>
  )
}

export default ProvidersLayout
