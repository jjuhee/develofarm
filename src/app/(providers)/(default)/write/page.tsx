"use client"
import Tiptap from "@/app/(providers)/(default)/write/_components/Tiptap"
import Spacer from "@/components/ui/Spacer"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { FormEvent, useRef, useState } from "react"
import { addProject } from "./api"
import { EditorContentProps } from "@tiptap/react"
import Category from "./_components/Category"

const Write = () => {
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [isActive, setIsActive] = useState(false)
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [region, setRegion] = useState<string>("")
  const [numberOfMembers, setNumberOfMembers] = useState<number>(0)

  const queryClient = useQueryClient()
  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: addProject,
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })

  const submitProjectHandler = (e: FormEvent) => {
    e.preventDefault()
    const dummyData = {
      user_id: "51aa9a6d-70ee-4123-af62-c8831421d4cb", //TODO:(jhee) 임시
      title,
      content,
      project_start_date: startDate,
      project_end_date: endDate,
      is_offline: false,
      number_of_people: 2,
    }
    console.log(dummyData)
    mutate(dummyData)
  }

  return (
    <form onSubmit={submitProjectHandler}>
      {/* TODO : (jhee) 첨부파일 넣는 곳? */}
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
      {/* TODO: (jhee) 선택 박스 추가, 위아래 border */}
      {/* <div className="flex flex-col border-solid border-y border-black">
        <Spacer y={30} />
        <input
          type="date"
          name="project_start_date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          name="project_end_date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <label>인원 수</label>
        <input
          type="number"
          value={numberOfMembers}
          onChange={(e) => setNumberOfMembers(e.target.value)}
        />
        <Spacer y={30} />
      </div> */}
      <Category isWritePage={true} />
      <Spacer y={30} />
      {/* Tiptap editor box */}
      <div className="border-solid border-b border-black">
        <Spacer y={20} />
        <Tiptap content={content} setContent={setContent} />
      </div>
    </form>
  )
}

export default Write
