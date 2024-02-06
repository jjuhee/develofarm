import React from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { removeProjectInMember, setProjectInMember } from "../../api"
import Image from "next/image"
import { useCustomModal } from "@/hooks/useCustomModal"
import useUserStore from "@/store/user"
import useAddNotiMutate from "@/hooks/useAddNotiMutate"
import { TProjectMemberType, TProjectMembersType } from "@/types/extendedType"

type Props = {
  applying: TProjectMemberType
  participatingApplications: TProjectMembersType
}

const AuthorizeActionButtons = ({
  applying,
  participatingApplications,
}: Props) => {
  const { user } = useUserStore((state) => state)
  const queryClient = useQueryClient()
  const { openCustomModalHandler } = useCustomModal()
  const addNotiMutate = useAddNotiMutate()

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
        queryKey: ["applicants", { projectId: applying.project_id }],
      })
    },
    onError: (error) => {
      openCustomModalHandler(`Error: ${error}`, "alert")
    },
  })

  const removeMemberMutate = useMutation({
    mutationFn: removeProjectInMember,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["applicants", { projectId: applying.project_id }],
      })

      openCustomModalHandler("거절되었습니다", "alert")
    },
    onError: (error) => {
      openCustomModalHandler(`Error: ${error}`, "alert")
    },
  })

  const onApplyButtonHandler = () => {
    const handler = () => {
      if (
        applying.projects?.number_of_people &&
        participatingApplications.length >= applying.projects?.number_of_people
      ) {
        return openCustomModalHandler("모집인원이 가득찼습니다!", "alert")
      } else {
        const newAcceptionNoti = {
          project_id: applying.project_id,
          receiver_id: applying.user_id,
          type: "acception",
          sender_nickname: user?.nickName as string,
        }
        updateMemberMutate.mutate({
          projectId: applying.project_id,
          userId: applying.user_id,
        })
        addNotiMutate(newAcceptionNoti)
      }
    }

    openCustomModalHandler(
      "프로젝트 멤버로 등록하시겠습니까?",
      "confirm",
      handler,
    )
  }

  const onRejectButtonHandler = () => {
    const handler = () => {
      const newRejectionNoti = {
        project_id: applying.project_id,
        receiver_id: applying.user_id,
        type: "rejection",
        sender_nickname: user?.nickName as string,
      }
      removeMemberMutate.mutate(applying.id)
      addNotiMutate(newRejectionNoti)
    }

    openCustomModalHandler("거절하시겠습니까?", "confirm", handler)
  }

  return (
    <div className="absolute flex flex-row-reverse ml-[390px] lg:ml-[1000px] w-48 mt-[-130px]">
      <button
        className="mr-5"
        onClick={() => {
          onApplyButtonHandler()
        }}
      >
        <Image
          width={20}
          height={20}
          src="/icons/checkIcon.png"
          alt="수락 아이콘"
          className="w-12 h-12 lg:w-16 lg:h-16 p-2 bg-[#000000] object-none rounded-full"
        />
      </button>
      <button onClick={onRejectButtonHandler}>
        <Image
          width={12}
          height={12}
          src="/icons/rejectIcon.png"
          alt="거절 아이콘"
          className="w-12 h-12 lg:w-16 lg:h-16 mr-5 bg-[#CDCDCD] bg-opacity-35 p-2 rounded-full object-none"
        />
      </button>
    </div>
  )
}

export default AuthorizeActionButtons
