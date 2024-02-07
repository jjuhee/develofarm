import Image from "next/image"
import React from "react"
import { getMembers, updateApplyingMember } from "../../api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCustomModal } from "@/hooks/useCustomModal"

type Props = {
  participating: Exclude<Awaited<ReturnType<typeof getMembers>>, null>[number]
}

const RemoveParticipatingMemberButton = ({ participating }: Props) => {
  const queryClient = useQueryClient()
  const { openCustomModalHandler } = useCustomModal()
  /**
   *@ mutaion 신청자 목록에서 멤버 삭제하고 확인창 띄워주기*/
  const updateApplyingMemberMutate = useMutation({
    mutationFn: async ({
      projectId,
      userId,
    }: {
      projectId: string
      userId: string
    }) => {
      return await updateApplyingMember(projectId, userId)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["applicants", { projectId: participating.project_id }],
      })
    },
    onError: (error) => {
      console.log(error)
    },
  })

  /**
   *@ function 신청자 목록에서 거절하기 */
  const onRejectButtonHandler = () => {
    const handler = () => {
      updateApplyingMemberMutate.mutate({
        projectId: participating.project_id,
        userId: participating.user_id,
      })
    }

    openCustomModalHandler(
      "이 멤버를 프로젝트 멤버에서\n제외하시겠습니까?",
      "confirm",
      handler,
    )
  }

  return (
    <button
      className="absolute ml-[220px] mt-[-10px]"
      onClick={onRejectButtonHandler}
    >
      <Image
        width={20}
        height={20}
        src="/icons/closeIcon.png"
        alt="닫기 버튼"
        className="inline-block"
      />
    </button>
  )
}

export default RemoveParticipatingMemberButton
