import React from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getMembers, setProjectInMember } from "../../api"
import Image from "next/image"
import { useCustomModal } from "@/hooks/useCustomModal"

type Props = {
  applicant: Exclude<Awaited<ReturnType<typeof getMembers>>, null>[number]
}

const ApplyButtons = ({ applicant }: Props) => {
  const queryClient = useQueryClient()
  const { openCustomModalHandler } = useCustomModal()

  const handler = () => {
    openCustomModalHandler("수락되었습니다!", "alert")
  }

  /**
   *@ mutaion 참여중인 멤버에 신청자 등록 후 확인창 띄워주기
   TODO: 업데이트 기능 수정 중 */
  const updateMemberMutate = useMutation({
    mutationFn: async ({
      projectId,
      userId,
    }: {
      projectId: string
      userId: string
    }) => {
      return setProjectInMember(projectId, userId)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["applyUser", { projectId: applicant.project_id }],
      })
      openCustomModalHandler(
        "프로젝트 멤버를 수락하시겠습니까?",
        "confirm",
        handler,
      )
    },
    onError: (error) => {
      console.log(error)
    },
  })

  /**
   *@ function 참여중인 멤버 등록
   TODO: 참여 멤버 등록 버튼 구현중 */
  const onApplyButtonHandler = () => {
    updateMemberMutate.mutate({
      projectId: applicant.project_id,
      userId: applicant.user_id,
    })
  }

  /**
   *@ function 신청자 목록에서 거절하기
   TODO: 신청자 삭제 기능 수정 중 */
  const onRejectButtonHandler = () => {}

  return (
    <div className="flex flex-row-reverse w-36 ml-auto mt-[-80px]">
      <button
        className="mr-5 hover:animate-[pulse_1s_ease-in-out_infinite]"
        onClick={() => {
          if (
            applicant.projects?.number_of_people &&
            Object.keys(applicant).length < applicant.projects.number_of_people
          ) {
            onApplyButtonHandler()
          }
        }}
      >
        <Image
          width={20}
          height={20}
          src="/icons/checkIcon.png"
          alt="수락 아이콘"
          className="w-11 h-11 p-2 bg-[#000000] object-none rounded-full"
        />
      </button>
      <button
        className="mr-3 hover:animate-[pulse_1s_ease-in-out_infinite]"
        onClick={onRejectButtonHandler}
      >
        <Image
          width={12}
          height={12}
          src="/icons/rejectIcon.png"
          alt="거절 아이콘"
          className="w-11 h-11 p-2 rounded-full bg-slate-300 object-none"
        />
      </button>
    </div>
  )
}

export default ApplyButtons
