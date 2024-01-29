import { PropsWithChildren } from "react"
import Header from "@/app/(providers)/(default)/_components/Header"
import Footer from "@/app/(providers)/(default)/_components/Footer"
import FloatingButton from "@/components/ui/FloatingButton"
import CustomModal from "@/components/CustomModal"

function ProvidersLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex flex-col w-full h-[100vh] justify-between">
        <div className="flex flex-col w-[1250px] mx-auto p-2 mb-20">
          {children}
        </div>
        <Footer />
      </div>
      <FloatingButton mode={"default"} />
      <CustomModal />
    </div>
  )
}

export default ProvidersLayout
