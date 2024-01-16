"use client"

import React, { useState } from "react"
import Spacer from "@/components/ui/Spacer"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getProject } from "../api"
import dayjs from "dayjs"
import WriterButtonUi from "./_components/WriterButtonUi"
import { FaRegMessage } from "react-icons/fa6"
import { CiUser } from "react-icons/ci"
import ProjectDetailFooter from "./_components/ProjectDetailFooter"

const DetailPage = () => {
  const { id } = useParams<{ id: string }>()

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProject(id),
  })

  // 타임스탬프로 들어간 날짜 포맷
  // ex) 2024-01-12T14:29:25.362227 -> 2024.01.12 14:29:25
  const FORMATTED_DATE = dayjs(project?.created_at).format(
    "YYYY.MM.DD HH:mm:ss",
  )
  const STARED_DATE = dayjs(project?.project_start_date).format("YYYY.MM.DD")
  const END_DATE = dayjs(project?.project_end_date).format("YYYY.MM.DD")

  if (isLoading || !project) return <div>is Loading...</div>
  const techStack = [
    { id: "1", tech: "React" },
    { id: "2", tech: "TypeScript" },
    { id: "3", tech: "JAVA" },
    { id: "4", tech: "Figma" },
  ]

  return (
    <div className="flex flex-col w-auto my-0 mx-auto">
      <Spacer y={90} />
      <header>
        <h1 className="text-3xl font-semibold">{project.title}</h1>
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
              width={48}
              height={48}
              src={`${project.user!.avatar_url}`}
              alt="프로필이미지"
              className="w-12 h-12 rounded-full object-cover"
            />
          </li>
          <li>
            <span className="pr-2">작성자</span>
            {project.user!.user_nickname}
          </li>
          <li>{FORMATTED_DATE}</li>
          <li>조회수 190</li>
          <WriterButtonUi project={project} />
        </ul>
      </header>
      <main className="h-full">
        <section>
          <div className="flex items-center justify-center border-t-2 border-b-2 border-zinc-600">
            <div className="pr-24 mt-7 mb-12">
              <h3 className="font-semibold">프로젝트 방식</h3>
              <p>{project.is_offline ? "오프라인" : "온라인"}</p>
            </div>
            <div className="pr-24 mt-7 mb-12">
              <h3 className="font-semibold">활동 지역</h3>
              <p>
                {project.is_offline
                  ? project.region
                    ? project.region.region
                    : "미설정"
                  : "온라인"}
              </p>
            </div>
            <div className="pr-24 mt-7 mb-12">
              <h3 className="font-semibold">프로젝트 기간</h3>
              <p>
                {STARED_DATE} - {END_DATE}
              </p>
            </div>
            <div className="pr-24 mt-7 mb-12">
              <h3 className="font-semibold">모집분야</h3>
              <select>
                <option>프론트엔드</option>
                <option>프론트엔드</option>
                <option>프론트엔드</option>
              </select>
              <select>
                <option>벡엔드</option>
              </select>
              <select>
                <option>디자이너</option>
              </select>
            </div>
            <div>
              <h3 className="font-semibold">구인 인원</h3>
              <h3>{project.number_of_people} 명</h3>
            </div>
          </div>
        </section>
        <Spacer y={50} />
        <section className="mb-5 border-t-2 border-b-2 border-zinc-600 pt-10 pb-10 min-h-96">
          <div className="leading-7">{project.content}</div>
        </section>
        <ProjectDetailFooter project={project} />
        <Spacer y={30} />
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
