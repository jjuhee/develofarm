"use client"

import React from "react"
import Spacer from "@/components/ui/Spacer"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getProject } from "../api"
import WriterEditRemoveButtons from "./_components/WriterEditRemoveButtons"
import FooterMenus from "./_components/FooterMenus"
import useUserStore from "@/store/user"
import ProjectMetaInfo from "./_components/ProjectMetaInfo"
import TechStackTag from "./_components/TechStackTag"
import ProjectWriterInfo from "./_components/ProjectWriterInfo"
import FooterList from "./_components/FooterList"

const DetailPage = () => {
  const { id } = useParams<{ id: string }>()

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProject(id),
  })

  /**
   *@ param1 현재 로그인한 유저 정보를 담은 변수
   *@ param2 글 작성자가 현재 로그인한 유저랑 같은지 판별하는 변수*/
  const { userId: currentUser } = useUserStore()
  const isWriter = currentUser === project?.user_id

  if (isLoading || !project) return <div>is Loading...</div>

  return (
    <div className="flex flex-col w-full my-0 mx-auto">
      <Spacer y={90} />
      <header>
        <h1 className="text-3xl font-semibold">{project.title}</h1>
        <Spacer y={30} />
        <TechStackTag />
        <Spacer y={25} />
        <ul className="flex gap-x-5 pl-2 text-zinc-400 mb-5 items-center">
          {project.user && (
            <ProjectWriterInfo project={project} user={project.user} />
          )}
          <WriterEditRemoveButtons project={project} isWriter={isWriter} />
        </ul>
      </header>
      <main className="h-full">
        {project.region && (
          <ProjectMetaInfo project={project} region={project.region} />
        )}
        <Spacer y={50} />
        <section className="mb-5 border-t-2 border-b-2 border-zinc-600 pt-10 pb-10 min-h-96">
          <div className="leading-7">{project.content}</div>
        </section>
        <FooterMenus project={project} />
        <Spacer y={50} />
        <FooterList />
      </main>
    </div>
  )
}

export default DetailPage
