import { PropsWithChildren } from "react"
import Provider from "../provider"
import Header from "@/app/(providers)/_components/Header"
import Footer from "@/app/(providers)/_components/Footer"

function ProvidersLayout({ children }: PropsWithChildren<{}>) {
  return (
    <Provider>
      <Header />
      <div className="flex flex-col w-full">
        <div className="flex w-[1440px]  my-0 mx-auto">{children}</div>
      </div>
      <Footer />
    </Provider>
  )
}

export default ProvidersLayout
