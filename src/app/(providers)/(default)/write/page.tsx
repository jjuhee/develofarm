"use client"
import Tiptap from "@/app/(providers)/(default)/write/_components/Tiptap"
import Spacer from "@/components/ui/Spacer"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import React, { FormEvent, useEffect, useRef, useState } from "react"
import { setProject } from "./api"
import Category from "./_components/Category"
import { useRouter } from "next/navigation"
import { Tables, TablesInsert, TablesUpdate } from "@/types/supabase"
import { supabaseForClient } from "@/supabase/supabase.client"
import { getProject, getProjectTechWithPosition } from "../projects/api"
import useUserStore from "@/store/user"
import formatDate from "@/utils/formatDate"

interface TProjectWithRegion extends Tables<"projects"> {
  region: Tables<"project_regions"> | null
}

interface Props {
  projectId: string
  project: TProjectWithRegion
  techsWithPositions: TTechs[]
}
const WritePage = ({ projectId, project, techsWithPositions }: Props) => {
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
  const [categoryData, setCategoryData] =
    useState<TCategoryData>(initialCategoryData)
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: setProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      alert("게시물 작성 완료~!")
      router.push("/")
    },
    onError: () => {
      alert(
        "DB에 알수 없는 에러로 게시물이 정상적으로 추가되지 않았을 수 있습니다(-.-)(_ _)",
      )
    },
  })
  /** 현재 인증된 유저 데이터 가져오기 */
  const { userId } = useUserStore()

  // /** 기본 POSITION_ID 대신 이걸로할까 : 프로젝트의 포지션 가져오기 */
  // const { data: positions } = useQuery({
  //   queryKey: ["postions", projectId],
  //   queryFn: () => getProjectPosition(projectId),
  //   enabled: !!projectId,
  // })

  /** 수정시4 : 내용 가져오기 */
  useEffect(() => {
    if (!isEditMode) return
    if (!project) return

    console.log("useEffect", project)
    setTitle(project.title)
    setContent(project.content)
    setCategoryData((prev) => ({
      ...prev,
      startDate: formatDate(project.project_start_date),
      endDate: formatDate(project.project_end_date),
      isOffline: project.is_offline,
      numberOfMembers: project.number_of_people,
      region: project.is_offline ? project.region?.id! : null,
      techs: techsWithPositions as TTechs[],
    }))
  }, [project])

  /** 제출하기 */
  const submitProjectHandler = (e: FormEvent) => {
    e.preventDefault()
    if (
      !title ||
      !content ||
      !categoryData.startDate ||
      !categoryData.endDate ||
      categoryData.numberOfMembers <= 0
    ) {
      alert("data를 모두 입력 해주세요~") // TODO P3:(jhee) 없는 것을 표시해 주면 좋겠다.
      return
    }
    if (categoryData.isOffline && !categoryData.region) {
      alert("오프라인 프로젝트이면 지역을 입력하세요~")
      return
    }
    //  TEMP START: (jhee) 포지션 id를 못넘겨 받아서 임시 변수와 처리 입니다.
    // 이미 읽어온 tech_position + tech 조인테이블로 작업하려고했는데 type 이슈가 있었는데 해결을 못해서
    // 너무 오래걸릴것 같아서 세개밖에 없는데...
    // id가 너무 가려있어서 관리가힘든데 어차피 유일한 값이면 이름으로 아이디 쓸까..
    const POSITION_ID = [
      "be33a56c-a4da-43a3-984f-c6acd667b2ae", // 프론트엔드
      "0e68d5ef-ebc4-40d5-afe8-9bf557a52746", // 백엔드
      "e2be10af-aa25-4aa8-b18a-9e004d4f9bed", // 디자인
    ]

    let positionData: string[] = []
    POSITION_ID.forEach((position_id) => {
      if (categoryData.techs.some((tech) => tech.position_id === position_id)) {
        positionData.push(position_id)
      }
    })
    if (positionData.length <= 0) {
      alert("구하는 포지션과 테크를 입력 하세요")
      return
    }
    // TEMP END
    const newData: TablesInsert<"projects"> = {
      user_id: userId,
      title,
      content,
      project_start_date: categoryData.startDate,
      project_end_date: categoryData.endDate,
      is_offline: categoryData.isOffline!,
      number_of_people: categoryData.numberOfMembers,
      region_id: categoryData.region,
    }

    mutate({
      project: newData,
      techs: categoryData.techs,
      positions: positionData,
    })

    resetState()
  }

  const resetState = () => {
    setTitle("")
    setContent("")
    setCategoryData(initialCategoryData)
  }

  return (
    <form onSubmit={submitProjectHandler}>
      <div className="flex flex-col mt-10 mb-10">
        <div className="flex">
          <input
            placeholder="제목을 작성하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="grow border-black border-solid border-2 rounded-md " //TODO : 얇게 어떻게
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

        {isEditMode ? (
          content && <Tiptap content={content} setContent={setContent} />
        ) : (
          <Tiptap content={content} setContent={setContent} />
        )}
      </div>
      {/* TODO P1: (jhee) 첨부파일 넣는 곳? */}
    </form>
  )
}

export default WritePage
