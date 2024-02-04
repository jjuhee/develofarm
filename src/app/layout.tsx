import type { Metadata } from "next"
import "./globals.css"
import Provider from "./provider"
import FloatingButton from "@/components/ui/FloatingButton"
import CustomModal from "@/components/CustomModal"
import localFont from "next/font/local"
import ScrollToTop from "@/components/ScrollToTop"

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard", // css 변수
})

export const metadata: Metadata = {
  title: "develofarm",
  description: "Find a project",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={pretendard.className}>
        <Provider>
          <ScrollToTop>
            {children}
            <div id="portal" className="relative z-50"></div>
            <FloatingButton />
            <CustomModal />
          </ScrollToTop>
        </Provider>
      </body>
    </html>
  )
}
