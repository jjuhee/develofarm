import React from "react"

const Comments = () => {
  return (
    <>
      <section className="">
        <div className="border-2 border-yellow-600">
          {/* <Image /> */}
          <span className="mr-2">작성자</span>
          {/* <span className="text-sm">{TODAY.toLocaleString()}</span> */}
          <div>댓글내용</div>
          <span>
            <button>대댓글</button>
          </span>
        </div>
      </section>
      <section>
        <textarea placeholder="댓글 내용을 입력하세요" />
        <button className="hover:bg-violet-600 hover:text-white">
          댓글 등록하기
        </button>
      </section>
    </>
  )
}

export default Comments
