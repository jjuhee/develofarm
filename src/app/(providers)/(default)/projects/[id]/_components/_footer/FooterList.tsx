import { useRouter } from "next/navigation"
import React from "react"

const FooterList = () => {
  const router = useRouter()

  return (
    <section className="clear-left">
      <p className="border-t border-b border-slate-950 p-3">
        이전게시물 (업데이트 예정)
      </p>
      <p className="border-b border-slate-950 p-3">
        다음게시물 (업데이트 예정)
      </p>
      {/* TODO: 목록으로 돌아가면 현재 있는 게시물이 있는 리스트로 돌아가게 구현해야함 */}
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
