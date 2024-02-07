import { useRouter } from "next/navigation"
import React from "react"

const FooterList = () => {
  const router = useRouter()

  return (
    <section className="clear-left">
      <button
        className="mt-8 border border-slate-950 px-5 py-1 rounded-lg transition delay-75 ease-in-out hover:text-white hover:bg-slate-900"
        onClick={() => router.replace("/projects")}
      >
        목록
      </button>
    </section>
  )
}

export default FooterList
