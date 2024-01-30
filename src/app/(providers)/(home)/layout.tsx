import { PropsWithChildren } from "react"
import Header from "@/app/(providers)/(default)/_components/Header"
import Footer from "@/app/(providers)/(default)/_components/Footer"
import CustomModal from "@/components/CustomModal"
import FloatingButton from "@/components/ui/FloatingButton"

function ProvidersLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-col w-full">{children}</div>
      <Footer />
      <FloatingButton mode={"default"} />
      <CustomModal />
    </div>
  )
}

export default ProvidersLayout
