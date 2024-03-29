"use client"
import Tiptap from "@/app/(providers)/(default)/write/_components/Tiptap"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { FormEvent, useEffect, useState } from "react"
import { setProject } from "../api"
import Category from "./Category"
import { useRouter } from "next/navigation"
import { Tables, TablesInsert } from "@/types/supabase"
import useUserStore from "@/store/user"
import dayjs from "dayjs"
import Button from "@/components/ui/Button"
import Attatchment from "./Attatchment"
import { useCustomModal } from "@/hooks/useCustomModal"

interface TProjectWithRegion extends Tables<"projects"> {
  region: Tables<"project_regions"> | null
}

interface Props {
  projectId?: string
  project?: TProjectWithRegion
  techsWithPositions?: TTechs[]
}

const Editor = ({ projectId, project, techsWithPositions }: Props) => {
  const [isShownCategory, setIsShownCategory] = useState(false)

  const isEditMode = !!projectId
  const initialCategoryData: TCategoryData = {
    startDate: "",
    endDate: "",
    isOffline: null,
    region: null,
    numberOfMembers: 0,
    positions: [],
    techs: [],
  }
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [categoryData, setCategoryData] =
    useState<TCategoryData>(initialCategoryData)

  const { openCustomModalHandler: customModal } = useCustomModal()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: setProject,
    onSuccess: (insertedData: any) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      customModal(isEditMode ? "수정 완료~!" : "게시물 작성 완료~!", "alert")
      resetState()
      /* 게시물의 상세페이지로 이동, DB 문제로 게시물이 작성되지 않았으면 프로젝트 페이지로 이동 */
      if (insertedData) router.push(`/projects/${insertedData[0].id}`)
      else router.push(`/projects`)
    },
    onError: () => {
      customModal(
        "DB에 알수 없는 에러로 게시물이 정상적으로 추가되지 않았을 수 있습니다(-.-)(_ _)",
        "alert",
      )
    },
  })
  /** 현재 인증된 유저 데이터 가져오기 */
  const userId = useUserStore((state) => state.user?.id) as string

  /** 수정시 : 내용 가져오기 */
  useEffect(() => {
    if (!isEditMode) return
    if (!project) return

    setTitle(project.title)
    setContent(project.content)
    setCategoryData((prev) => ({
      ...prev,
      startDate: dayjs(project.project_start_date).format("YYYY-MM-DD"),
      endDate: dayjs(project.project_end_date).format("YYYY-MM-DD"),
      isOffline: project.is_offline,
      numberOfMembers: project.number_of_people,
      region: project.is_offline ? project.region?.id! : null,
      techs: techsWithPositions as TTechs[],
    }))
  }, [project])

  /** 제출하기 */
  const submitProjectHandler = (e: FormEvent) => {
    e.preventDefault()
    if (!title || !content) {
      customModal("제목과 내용을 입력하셨나요?", "alert")
      return
    }
    if (categoryData.numberOfMembers <= 0) {
      customModal("구인 인원을 입력해주세요", "alert")
      return
    }
    if (!categoryData.startDate || !categoryData.endDate) {
      customModal("프로젝트 기간을 설정해주세요", "alert")
      return
    }

    if (categoryData.isOffline && !categoryData.region) {
      customModal("오프라인 프로젝트이면 지역을 입력하세요", "alert")
      return
    }
    if (categoryData.techs.length <= 0) {
      customModal("원하는 포지션과 테크를 입력하세요", "alert")
      return
    }

    /* 쓰기/수정 둘다 사용 주의 */
    let newData: TablesInsert<"projects"> = {
      id: projectId,
      user_id: userId,
      title,
      content,
      project_start_date: categoryData.startDate,
      project_end_date: categoryData.endDate,
      is_offline: categoryData.isOffline!,
      number_of_people: categoryData.numberOfMembers,
      region_id: categoryData.region,
      updated_at: isEditMode ? dayjs(new Date()).toString() : null,
    }

    mutate({
      isEditMode,
      project: newData,
      techs: categoryData.techs,
      file: selectedFile,
    })
  }

  const resetState = () => {
    setTitle("")
    setContent("")
    setCategoryData(initialCategoryData)
  }

  return (
    <form
      className="flex flex-col gap-[20px] lg:gap-[30px]"
      onSubmit={submitProjectHandler}
    >
      <div className="flex">
        <input
          placeholder="제목을 작성하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="grow border-[1px] border-black rounded-md h-[35px] text-[15px] px-[15px] py-[9px] mx-[20px] lg:h-[50px] lg:text-[18px] lg:px-[26px] lg:mx-0"
        />
      </div>
      {/*  카테고리 선택 box  */}
      <Category
        categoryData={categoryData}
        setCategoryData={setCategoryData}
        isWritePage={true}
        setIsShownCategory={setIsShownCategory}
      />
      {/* Tiptap editor box */}
      <div className=" border-y border-black">
        {isEditMode ? (
          content && (
            <div>
              <Tiptap content={content} setContent={setContent} />
            </div>
          )
        ) : (
          <Tiptap content={content} setContent={setContent} />
        )}
      </div>
      <div className="mb-[70px] lg:mb-0">
        <Attatchment setSelectedFile={setSelectedFile} />
      </div>
      <div className="buttonbox flex justify-around border-[#d2d2d2] border-t bg-white fixed bottom-0 right-0 w-full *:min-w-[150px] *:h-[36px] py-[10px] px-[20px] z-20 lg:border-0 lg:relative lg:z-0 lg:px-0 lg:justify-between">
        <Button
          buttonType="button"
          type="border"
          text="취소하기"
          handler={() => {
            router.back()
          }}
        />
        <Button
          buttonType="submit"
          text="게시하기"
          handler={submitProjectHandler}
        />
      </div>
    </form>
  )
}

export default Editor
