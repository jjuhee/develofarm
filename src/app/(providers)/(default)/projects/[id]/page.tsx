import React from "react"
import Spacer from "@/components/ui/Spacer"
import Image from "next/image"
import profileImg from "../../../../../../public/images/pathway-in-the-middle-of-the-green-leafed-trees-with-the-sun-shining-through-the-branches.jpg"
import { CiBookmark } from "react-icons/ci"
import { FaRegMessage } from "react-icons/fa6"
import { IoShareSocialOutline } from "react-icons/io5"

const DetailPage = () => {
  const TODAY = new Date()
  const techStack = [
    { id: "1", tech: "React" },
    { id: "2", tech: "TypeScript" },
    { id: "3", tech: "JAVA" },
    { id: "4", tech: "Figma" },
  ]

  return (
    <div className="flex flex-col w-10/12 my-0 mx-auto">
      <Spacer y={90} />
      <header>
        <h1 className="text-3xl font-semibold">
          책 커뮤니티 관련 프로젝트 멤버 구합니다!
        </h1>
        <Spacer y={30} />
        <ul className="flex text-sm">
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
        <Spacer y={25} />
        <ul className="flex gap-x-5 pl-2 text-zinc-400 mb-5 items-center">
          <li>
            <Image
              src={profileImg}
              alt="프로필이미지"
              className="w-12 h-12 rounded-full object-cover"
            />
          </li>
          <li>
            <span className="pr-2">작성자</span> 강쟝
          </li>
          <li>{TODAY.toLocaleString()}</li>
          <li>조회수 190</li>
        </ul>
      </header>
      <main className="border-2 border-rose-600 h-full">
        <section>
          <div className="flex items-center justify-center border-t-2 border-b-2 border-zinc-600">
            <div className="pr-24 mt-7 mb-12">
              <h3 className="font-semibold">프로젝트 방식</h3>
              <p>온라인</p>
            </div>
            <div className="pr-24 mt-7 mb-12">
              <h3 className="font-semibold">활동 지역</h3>
              <p>온라인</p>
            </div>
            <div className="pr-24 mt-7 mb-12">
              <h3 className="font-semibold">프로젝트 기간</h3>
              <p>2024-01-11 ~ 2024-04-11</p>
            </div>
            <div className="pr-24 mt-7 mb-12">
              <h3 className="font-semibold">모집분야</h3>
              <button>프론트엔드</button>
              <button>벡엔드</button>
              <button>디자이너</button>
            </div>
            <div>
              <h3 className="font-semibold">구인 인원</h3>
              <h3>6명</h3>
            </div>
          </div>
        </section>
        <Spacer y={50} />
        <section className="mb-5 border-t-2 border-b-2 border-zinc-600 pt-10 pb-10 h-auto min-h-2">
          <div className="leading-7">
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
          <span>모집인원 3/5</span>
        </section>
        <section className="flex">
          <article className="flex">
            <span className="pr-5">
              <FaRegMessage className="inline-block" /> 24
            </span>
            <span className="pr-5">신청자 수: 10</span>
          </article>
          <article className="flex justify-end w-8">
            <span className="pr-5">
              <span>
                <CiBookmark className="inline-block" />
              </span>
              5
            </span>
            <span className="flex-end">
              <IoShareSocialOutline />
            </span>
            <button className="hover:bg-violet-600 hover:text-white flex-end">
              참여 신청
            </button>
          </article>
        </section>
        <section className="border-2 border-yellow-600">
          <div>
            <span>작성자</span>
            <span>작성날짜</span>
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
        <section className="border-2 border-blue-500">
          <p>이전게시물</p>
          <p>다음게시물</p>
          <button>목록</button>
        </section>
      </main>
    </div>
  )
}

export default DetailPage
