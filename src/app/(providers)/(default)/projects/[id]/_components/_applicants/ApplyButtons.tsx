import { useMutation, useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import React from "react"
import { getMembers, setProjectInMember } from "../../api"

type Props = {
  applicant: Exclude<Awaited<ReturnType<typeof getMembers>>, null>[number]
}

const ApplyButtons = ({ applicant }: Props) => {
  const queryClient = useQueryClient()
  /**
   *@ mutaion 참여중인 멤버에 신청자 등록 후 확인창 띄워주기
   TODO: 업데이트 기능 수정 중 */
  // const updateMemberMutate = useMutation({
  //   mutationFn: (applicant.project_id, applicant.user_id) =>
  //     setProjectInMember({ project_id: applicant.project_id, userId }),
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries({
  //       queryKey: ["project", { projectId: applicant.project_id }],
  //     })
  //   },
  //   onError: (error) => {
  //     console.log(error)
  //   },
  // })

  /**
   *@ function 참여중인 멤버 등록
   TODO: 참여 멤버 등록 버튼 구현중 */
  const onApplyButtonHandler = () => {
    // updateMemberMutate.mutate({
    //   projectId: applicant.project_id,
    //   userId: applicant.user_id,
    // })
  }

  /**
   *@ function 신청자 목록에서 거절하기
   TODO: 신청자 삭제 기능 수정 중 */
  const onRejectButtonHandler = () => {}

  return (
    <div className="flex flex-row-reverse w-36 ml-auto mt-[-105px]">
      <button className="mr-5" onClick={() => onApplyButtonHandler()}>
        <Image
          width={16}
          height={16}
          src="/images/checkIcon.png"
          alt="수락 아이콘"
          className="w-11 h-11 p-2 rounded-full bg-[#B8FF65] object-none"
        />
      </button>
      <button className="mr-3" onClick={onRejectButtonHandler}>
        <Image
          width={12}
          height={12}
          src="/images/rejectIcon.png"
          alt="거절 아이콘"
          className="w-11 h-11 p-2 rounded-full bg-slate-300 object-none"
        />
      </button>
    </div>
  )
}

export default ApplyButtons
