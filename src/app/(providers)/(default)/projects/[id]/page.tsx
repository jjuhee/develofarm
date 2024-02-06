"use client"

import React, { useEffect } from "react"
import Spacer from "@/components/ui/Spacer"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getProject } from "../api"
import WriterEditRemoveButtons from "./_components/_header/WriterEditRemoveButtons"
import FooterMenus from "./_components/_footer/FooterMenus"
import useUserStore from "@/store/user"
import ProjectMetaInfo from "./_components/_header/ProjectMetaInfo"
import TechStackTag from "./_components/_header/TechStackTag"
import ProjectWriterInfo from "./_components/_header/ProjectWriterInfo"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "next/image"
import FooterList from "./_components/_footer/FooterList"

const DetailPage = () => {
  const { id } = useParams<{ id: string }>()

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", { projectId: id }],
    queryFn: () => getProject(id),
  })

  const editor = useEditor({
    extensions: [StarterKit],
    editable: false,
    content: project?.content,
    editorProps: {
      attributes: {
        class: "prose prose-m max-w-none mx-auto *:my-2 focus:outline-none",
      },
    },
  })

  useEffect(() => {
    if (!editor) {
      return
    }
    editor.commands.setContent(project?.content!)
  }, [project?.content])

  const { user } = useUserStore((state) => state)
  const isWriter = user?.id === project?.user_id

  if (isLoading || !project)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Image src={"/images/load.gif"} alt="load" width={200} height={200} />
      </div>
    )

  return (
    <div className="flex flex-col w-full my-0 mx-auto">
      <Spacer y={30} />
      <header>
        <Spacer y={50} />
        <div className="flex items-center">
          <span
            className={`${
              project.recruit_status
                ? "bg-[#666666] border-[#666666] text-white"
                : "bg-white  border-black text-black"
            } min-w-[90px] px-3 py-1 border-2 text-center rounded-2xl text-[16px] font-[700]`}
          >
            {project.recruit_status ? "모집 완료" : "모집 중"}
          </span>
          <h1 className="ml-3 text-3xl font-semibold">{project.title}</h1>
        </div>
        <Spacer y={30} />
        <TechStackTag project={project} />
        <Spacer y={25} />
        <ul className="flex gap-x-5 pl-2 text-zinc-400 mb-5 items-center text-lg">
          {project.user && <ProjectWriterInfo project={project} />}
          <WriterEditRemoveButtons project={project} isWriter={isWriter} />
        </ul>
      </header>
      <main>
        <ProjectMetaInfo project={project} />
        <Spacer y={50} />
        <section className="mb-5 border-b-2 border-zinc-600 pb-10 min-h-96">
          <EditorContent editor={editor} />
        </section>
        <FooterMenus project={project} />
        <Spacer y={20} />
      </main>
      <FooterList />
    </div>
  )
}

export default DetailPage
