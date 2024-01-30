import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Provider from "./provider"

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
      <head>
        <script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
          integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8"
          crossOrigin="anonymous"
          async
        ></script>
      </head>
      <body className={inter.className}>
        <Provider>
          {children}
          <div id="portal" className="relative z-50"></div>
        </Provider>
      </body>
    </html>
  )
}
