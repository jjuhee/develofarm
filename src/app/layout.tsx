import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Provider from "./provider"
import useCustomModalStore from "@/store/customModal"
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
          <div className="flex flex-col">
            {children}
            <div id="portal"></div>
          </div>
        </Provider>
      </body>
    </html>
  )
}
