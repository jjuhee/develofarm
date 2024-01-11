import React from "react"
import Spacer from "@/components/ui/Spacer"

const DetailPage = () => {
  return (
    <div>
      <Spacer y={90} />
      <header>
        <span>[tag]React, [tag]NextJS, [tag]JAVA</span>
        <button>목록</button>
        <h1>[project.title] 프로젝트 구인 게시글</h1>
        <ul>
          <li>[project.writer]아무개</li>
          <li>[project.createAt]2024.01.09</li>
          <li>조회수: 123456</li>
        </ul>
      </header>
      <main>
        <section>[project.content] 작성 내용</section>
        <section>
          <ul>
            <li>[member][memberCnt]3/5 멤버1, 멤버2, 멤버3</li>
          </ul>
        </section>
        <section>
          <span>댓글 갯수: 24</span>
          <span>신청자 수: 10</span>
          <span>[bookmark] 5</span>
          <button className="hover:bg-violet-600 hover:text-white">
            참여 신청
          </button>
        </section>
        <section>
          <textarea placeholder="댓글 내용을 입력하세요" />
          <button className="hover:bg-violet-600 hover:text-white">
            댓글 등록하기
          </button>
        </section>
        <section>
          <ul>
            <li>[comment.writer] 작성자</li>
            <li>[comment.createAt] 작성날짜</li>
            <li>[comment.content] 댓글내용</li>
            <li>
              <button>대댓글</button>
            </li>
          </ul>
        </section>
      </main>
      <footer>
        <p>이전게시물</p>
        <p>다음게시물</p>
      </footer>
    </div>
  )
}

export default DetailPage
