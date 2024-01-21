import { Tables } from "@/types/supabase"
import React, { SetStateAction, useState } from "react"
import Comments from "./Comments"
import Applicants from "./Applicants"
import Spacer from "@/components/ui/Spacer"
import FooterAuthButton from "./FooterAuthButton"
import useUserStore from "@/store/user"
import FooterPublicIcon from "./FooterPublicIcon"
import { IoIosPeople } from "react-icons/io"
import { FaRegMessage } from "react-icons/fa6"
import { CiUser } from "react-icons/ci"
import { getCommentsCount } from "../../api"
import { useQuery } from "@tanstack/react-query"

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
   *@ query 해당 게시물 id를 구분해 댓글 목록 조회 */
  const { data: comments, isLoading: commentsIsLoading } = useQuery({
    queryKey: ["comments", { projectId: project.id }],
    queryFn: () => getCommentsCount(project.id),
  })

  console.log("삭제여부데이터", comments)

  if (commentsIsLoading) return <div>is Loading...</div>

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
              className={`pr-8 pb-1 border-b-2 ${
                isSelected === "applicants" && " border-slate-600"
              }`}
              onClick={() => toggleTapHandler("applicants")}
            >
              <CiUser size={35} className="inline-block ml-8 mr-1" /> 24
            </button>
          </>
        ) : (
          <>
            <span className="pr-10">
              <FaRegMessage size={30} className="inline-block ml-2 mr-2" />{" "}
              {comments?.length}
            </span>
            <span className="pr-8">
              <IoIosPeople size={40} className="inline-block ml-8 mr-1" />
              모집정원 3/{project.number_of_people}
            </span>
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
        {isSelected === "applicants" && <Applicants />}
      </section>
    </>
  )
}

export default FooterMenus
