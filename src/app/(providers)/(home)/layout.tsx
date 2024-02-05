import { PropsWithChildren } from "react"
import Header from "@/app/(providers)/(default)/_components/Header"
import Footer from "@/app/(providers)/(default)/_components/Footer"

function ProvidersLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-col w-full">{children}</div>
      <Footer />
    </div>
  )
}

export default ProvidersLayout
