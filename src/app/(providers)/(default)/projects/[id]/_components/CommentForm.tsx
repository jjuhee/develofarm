import React from "react"

const CommentForm = () => {
  return (
    <section className="flex flex-col border border-slate-600 p-5 min-h-12">
      <textarea
        placeholder="댓글 내용을 입력하세요"
        maxLength={500}
        className="outline-none resize-none"
      />
      <button className="border-2 border-slate-900 px-3 py-2 ml-auto rounded-full hover:bg-slate-900 hover:text-white transition delay-150 ease-in-out font-semibold">
        댓글 쓰기
      </button>
    </section>
  )
}

export default CommentForm
