import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Provider from "./provider"
import FloatingButton from "@/components/ui/FloatingButton"
import CustomModal from "@/components/CustomModal"

const inter = Inter({ subsets: ["latin"] })

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
      <body className={inter.className}>
        <Provider>
          {children}
          <div id="portal" className="relative z-50"></div>
          <FloatingButton />
          <CustomModal />
        </Provider>
      </body>
    </html>
  )
}
