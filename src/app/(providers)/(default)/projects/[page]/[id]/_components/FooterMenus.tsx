import { Tables } from "@/types/supabase"
import React, { SetStateAction, useState } from "react"
import Comments from "./_comments/Comments"
import Applicants from "./_applicants/Applicants"
import Spacer from "@/components/ui/Spacer"
import FooterAuthButton from "./FooterAuthButton"
import useUserStore from "@/store/user"
import FooterPublicIcon from "./FooterPublicIcon"
import { IoIosPeople } from "react-icons/io"
import { FaRegMessage } from "react-icons/fa6"
import { getCommentsCount } from "../../../api"
import { useQuery } from "@tanstack/react-query"
import { getMembers } from "../api"
import Image from "next/image"
import MembersInProjectModal from "./_applicants/MembersInProjectModal"

type Props = {
  project: Tables<"projects">
}

const FooterMenus = ({ project }: Props) => {
  /**
   *@ param 댓글목록과 신청자목록에 상태값을 담은 변수*/
  const [isSelected, setIsSelected] = useState<"comments" | "applicants">(
    "comments",
  )
  /**
   *@ param 신청자 목록 hover시 나타나는 태그를 담은 변수*/
  /**
   *@ param1 현재 로그인한 유저 정보를 담은 변수
   *@ param2 글 작성자가 현재 로그인한 유저랑 같은지 판별하는 변수*/
  const { userId } = useUserStore()
  const isWriter = userId === project.user_id

  /**
   *@ function 클릭시 탭메뉴 선택 */
  const toggleTapHandler = (
    tabName: SetStateAction<"comments" | "applicants">,
  ) => {
    setIsSelected(tabName)
  }

  /**
   *@ query 해당 게시물 id를 구분하고 삭제된 댓글 제외한 목록 조회
   TODO: 글 삭제시 새로고침시에 전체갯수 업데이트 */
  const { data: comments, isLoading: commentsIsLoading } = useQuery({
    queryKey: ["commentsCnt", { projectId: project.id }],
    queryFn: () => getCommentsCount(project.id),
  })

  /**
   *@ query 해당 게시물 id를 구분하고 신청자 목록 조회 */
  const { data: applicants, isLoading: applicantsIsLoading } = useQuery({
    queryKey: ["applicants", { projectId: project.id }],
    queryFn: () => getMembers(project.id),
  })

  if (commentsIsLoading) return <div>is Loading...</div>
  if (applicantsIsLoading) return <div>is Loading...</div>

  return (
    <>
      <section className="flex items-center">
        {/* 글 작성자 여부에 따른 하단 메뉴 */}
        {isWriter ? (
          <>
            <button
              className={`pr-12 pb-2 border-b-2 ${
                isSelected === "comments" && " border-slate-600"
              }`}
              onClick={() => toggleTapHandler("comments")}
            >
              <FaRegMessage size={30} className="inline-block ml-10 mr-2" />
              {comments?.length}
            </button>
            <button
              className={`pr-8 border-b-2 ${
                isSelected === "applicants" && " border-slate-600"
              }`}
              onClick={() => toggleTapHandler("applicants")}
            >
              <IoIosPeople size={40} className="inline-block ml-8 mr-1" />{" "}
              {applicants?.length}
            </button>
          </>
        ) : (
          <>
            <button disabled className="pr-10">
              <FaRegMessage size={30} className="inline-block ml-2 mr-2" />{" "}
              {comments?.length}
            </button>
            <MembersInProjectModal project={project} />
          </>
        )}
        {/* 모두가 볼 수 있는 아이콘 */}
        <FooterPublicIcon />
        {/* 사용자에 따라서 다른 버튼 */}
        <FooterAuthButton project={project} isWriter={isWriter} />
      </section>
      <Spacer y={25} />
      {/* 탭 메뉴에 따라 나오는 컴포넌트 */}
      <section>
        {isSelected === "comments" && <Comments project={project} />}
        {isSelected === "applicants" && applicants && (
          <>
            <Applicants
              applicants={applicants}
              status={true}
              project={project}
            />
            <Applicants applicants={applicants} status={false} />
          </>
        )}
      </section>
    </>
  )
}

export default FooterMenus
