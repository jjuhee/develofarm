import React, { useState } from "react"

const ReCommentForm = () => {
  const [showForm, setShowForm] = useState<boolean>(false)

  const toggleFormHandler = () => {
    setShowForm(!showForm)
  }
  return (
    <>
      <button className="w-8" onClick={toggleFormHandler}>
        댓글
      </button>
      {showForm && (
        <form className="flex flex-col border border-slate-600 p-5 mb-5">
          <textarea className="outline-none resize-none" />
          <button className="border-2 border-slate-900 px-3 py-2 ml-auto rounded-full hover:bg-slate-900 hover:text-white transition delay-150 ease-in-out font-semibold">
            댓글 작성
          </button>
        </form>
      )}
    </>
  )
}

export default ReCommentForm
