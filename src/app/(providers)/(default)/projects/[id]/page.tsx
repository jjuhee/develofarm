"use client"

import React, { useEffect } from "react"
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
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

const DetailPage = () => {
  const { id } = useParams<{ id: string }>()

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", id],
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
        <TechStackTag project={project} />
        <Spacer y={25} />
        <ul className="flex gap-x-5 pl-2 text-zinc-400 mb-5 items-center">
          {project.user && (
            <ProjectWriterInfo project={project} user={project.user} />
          )}
          <WriterEditRemoveButtons project={project} isWriter={isWriter} />
        </ul>
      </header>
      <main>
        <ProjectMetaInfo project={project} />
        <Spacer y={50} />
        <section className="mb-5 border-t-2 border-b-2 border-zinc-600 pb-10 min-h-96">
          <EditorContent editor={editor} />
        </section>
        <FooterMenus project={project} />
        <Spacer y={50} />
        <FooterList />
      </main>
    </div>
  )
}

export default DetailPage
