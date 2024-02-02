import { PropsWithChildren } from "react"
import Header from "@/app/(providers)/(feature)/_components/Header"
import Footer from "@/app/(providers)/(feature)/_components/Footer"
import FloatingButton from "@/components/ui/FloatingButton"
import CustomModal from "@/components/CustomModal"

function ProvidersLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col h-[100vh]">
      <Header />
      <div className="flex flex-col w-full h-full justify-between">
        <div className="flex flex-col max-w-[1250px] mx-auto">{children}</div>
        <Footer />
      </div>
    </div>
  )
}

export default ProvidersLayout
