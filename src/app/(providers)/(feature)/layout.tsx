import { PropsWithChildren } from "react"
import Header from "@/app/(providers)/(feature)/_components/Header"
import Footer from "@/app/(providers)/(feature)/_components/Footer"
import FloatingButton from "@/components/ui/FloatingButton"
import Provider from "@/app/provider"

function ProvidersLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col">
      {/* <Provider> */}
      <Header />
      <div className="flex w-full">
        <div className="flex flex-col w-[1250px] my-0 mx-auto">{children}</div>
      </div>
      <Footer />
      {/* </Provider> */}
      <FloatingButton />
    </div>
  )
}

export default ProvidersLayout
