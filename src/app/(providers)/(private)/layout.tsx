import { PropsWithChildren } from "react"
import Header from "@/app/(providers)/(private)/_components/Header"
import Footer from "@/app/(providers)/(private)/_components/Footer"

function ProvidersLayout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Header />
      <div className="flex w-full">
        <div className="flex flex-col w-[1440px] my-0 mx-auto">{children}</div>
      </div>
      <Footer />
    </>
  )
}

export default ProvidersLayout
