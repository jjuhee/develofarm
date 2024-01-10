import BookmarkButton from "@/components/BookmarkButton"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const ProjectCard = () => {
  return (
    // TODO: 아이템 누르면 디테일 페이지로 이동(/projects/:id)
    <Link href={`projects/1`} className="flex">
      <section className="relative overflow-hidden rounded-xl w-full max-w-[498px] h-[270px] bg-slate-200 mr-20">
        <Image
          src={"/images/React.jpeg"}
          alt="project"
          fill
          sizes="auto"
          className="object-cover w-full h-full transition group-hover:scale-110 "
        />
      </section>
      <section className="relative flex flex-col pt-5 gap-3 w-full">
        <div className="flex gap-2 items-center">
          <span className="bg-gray-300 px-2 py-1 rounded-md text-[20px]">
            모집 중{" "}
          </span>
          <h3 className="text-[26px] font-[700]">프로젝트 구인 타이틀</h3>
        </div>
        <span>0000.00.00 - 0000.00.00</span>
        <p>
          The only moment, the only life we have is in the NOW. What happened a
          few moments or several years ago is gone, what will happen this
          evening, or next month when we go on holidays is not here yet.
        </p>
        <ul className="flex gap-3 ">
          <li className="border-2 px-3 py-1 rounded-full">NestJS</li>
          <li className="border-2 px-3 py-1 rounded-full">Spring</li>
          <li className="border-2 px-3 py-1 rounded-full">C#</li>
          <li className="border-2 px-3 py-1 rounded-full">JAVA</li>
        </ul>
        <div className="absolute top-4 right-3">
          <BookmarkButton />
        </div>
      </section>
    </Link>
  )
}

export default ProjectCard
