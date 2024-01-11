import React from "react"
import Spacer from "@/components/ui/Spacer"
import Image from "next/image"
import profileImg from "../../../../../../public/images/pathway-in-the-middle-of-the-green-leafed-trees-with-the-sun-shining-through-the-branches.jpg"

const DetailPage = () => {
  const TODAY = new Date()
  const techStack = [
    { id: "1", tech: "React" },
    { id: "2", tech: "TypeScript" },
    { id: "3", tech: "JAVA" },
    { id: "4", tech: "UX/UI Designer" },
  ]

  return (
    <div className="flex flex-col h-full w-9/12 my-0 mx-auto">
      <Spacer y={90} />
      <header>
        <h1 className="text-3xl font-semibold">
          책 커뮤니티 관련 프로젝트 멤버 구합니다!
        </h1>
        <ul className="flex text-sm mt-5 mb-5">
          {techStack.map((tech) => {
            return (
              <li
                className="border-solid border-2 p-2 pl-3 pr-3 mr-2 rounded-3xl border-rose-400 text-rose-400"
                key={tech.id}
              >
                {tech.tech}
              </li>
            )
          })}
        </ul>
        <ul className="flex gap-x-7 pl-2 text-zinc-400 mb-5">
          <li>
            <Image
              src={profileImg}
              alt="프로필이미지"
              className="w-12 rounded-5xl"
            />
          </li>
          <li>강쟝</li>
          <li>{TODAY.toLocaleString()}</li>
          <li>조회수 190</li>
        </ul>
      </header>
      <main>
        <section>
          <ul>
            <li>프로젝트 방식</li>
            <li>활동 지역</li>
            <li>프로젝트 기간</li>
            <li>모집분야</li>
          </ul>
          <ul>
            <li></li>
          </ul>
        </section>
        <section className="mb-5">
          <div>
            안녕하세요! 책과 관련해서 간단하게 프로젝트 하나 진행할건데 관심
            있으신 분들 댓글 남겨 주세요!
            <br />
            React로 구현할거라서 자바스크립트는 충분히 숙지가 되어 있으신
            분들이면 좋고 백엔드 쪽은
            <br />
            서버 api만들어 주실 수 있는 분 구합니당 ㅠㅠ
            <br />
            디자이너님 같은 경우는 기본적인 개발 용어는 숙지가 되어 있었으면
            합니다 (ex. 드롭다운, 페이징, 네비바 등)
          </div>
        </section>
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
        <button>목록</button>
      </footer>
    </div>
  )
}

export default DetailPage
