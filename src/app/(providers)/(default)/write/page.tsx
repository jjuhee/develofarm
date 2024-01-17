"use client"
import Tiptap from "@/app/(providers)/(default)/write/_components/Tiptap"
import Spacer from "@/components/ui/Spacer"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { FormEvent, useRef, useState } from "react"
import { addProject } from "./api"
import { EditorContentProps, isActive } from "@tiptap/react"
import Category from "./_components/Category"
import { useRouter } from "next/navigation"

const Write = () => {
  const initialCategoryData: TCategoryData = {
    startDate: "",
    endDate: "",
    isOffline: false,
    region: "",
    numberOfMembers: 0,
    positions: [],
    techs: [], // TODO: tech에 여러개 받고 한번에 넣는 법..
  }

  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [categoryData, setCategoryData] =
    useState<TCategoryData>(initialCategoryData)
  const router = useRouter()

  const queryClient = useQueryClient()
  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: addProject,
    onSuccess: () => {
      queryClient.invalidateQueries()
      alert("게시물 작성 완료~!")
      router.push("/")
    },
  })

  const submitProjectHandler = (e: FormEvent) => {
    e.preventDefault()
    if (
      !title &&
      !content &&
      !categoryData.startDate &&
      !categoryData.endDate &&
      categoryData.numberOfMembers == 0
    ) {
      alert("data를 모두 입력 해주세요~")
      return
    }
    if (categoryData.isOffline && !categoryData.region) {
      alert("오프라인 프로젝트이면 지역을 입력하세요~")
      return
    }
    {
      const newData = {
        user_id: "51aa9a6d-70ee-4123-af62-c8831421d4cb", //TODO:(jhee) 임시 유저 변경
        title,
        content,
        project_start_date: categoryData.startDate,
        project_end_date: categoryData.endDate,
        is_offline: categoryData.isOffline,
        number_of_people: categoryData.numberOfMembers,
      }

      console.log(newData)
      mutate(newData)
    }
  }

  return (
    <form onSubmit={submitProjectHandler}>
      <div className="flex flex-col mt-10 mb-10">
        <div className="flex">
          <input
            placeholder="제목을 작성하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="grow border-black border-solid border-2 rounded-md " //TODO : 얇게 어떻게 햐
          />
          <button
            type="submit"
            className="w-40 rounded-full border-solid border-2 bg-black text-white"
          >
            작성하기
          </button>
        </div>
      </div>
      {/*  카테고리 선택 box  */}
      <Category
        categoryData={categoryData}
        setCategoryData={setCategoryData}
        isWritePage={true}
      />
      <Spacer y={30} />
      {/* Tiptap editor box */}
      <div className="border-solid border-b border-black">
        <Spacer y={20} />
        <Tiptap content={content} setContent={setContent} />
      </div>
      {/* TODO : (jhee) 첨부파일 넣는 곳? */}
    </form>
  )
}

export default Write
