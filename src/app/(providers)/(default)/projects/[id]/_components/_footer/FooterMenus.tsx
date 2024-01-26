import { Tables } from "@/types/supabase"
import React, { SetStateAction, useState } from "react"
import Comments from "../_comments/Comments"
import Applicants from "../_applicants/Applicants"
import Spacer from "@/components/ui/Spacer"
import FooterAuthButton from "./FooterAuthButton"
import useUserStore from "@/store/user"
import FooterPublicIcon from "./FooterPublicIcon"
import { useQuery } from "@tanstack/react-query"
import { getComments, getMembers } from "../../api"
import { getBookmarks, getBookmarksByProjectId } from "../../../api"
import Image from "next/image"

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
   *@ query 해당 게시물 id를 구분하고 삭제된 댓글 제외한 목록 조회
   TODO: 글 삭제시 새로고침시에 전체갯수 업데이트 */
  const { data, isLoading: commentsIsLoading } = useQuery({
    queryKey: ["comments", { projectId: project.id }],
    queryFn: () => getComments(project.id),
  })

  const comments = data?.filter((comment) => comment.del_yn === false)

  /**
   *@ query 해당 게시물 id를 구분하고 신청자 목록 조회 */
  const { data: applicants, isLoading: applicantsIsLoading } = useQuery({
    queryKey: ["applicants", { projectId: project.id }],
    queryFn: () => getMembers(project.id),
  })

  /**
   *@ param 신청 대기 중인 인원 수 */
  const pendingApplications = applicants?.filter(
    (applicant) => applicant.application_status === false,
  )

  /** 전체 북마크 데이터 조회 */
  const { data: bookmarks } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: getBookmarks,
  })

  /** projectID에 해당하는 북마크 데이터 조회 */
  const { data: bookmarksCount } = useQuery({
    queryKey: ["bookmarksCount", { bookmarks: bookmarks }],
    queryFn: () => getBookmarksByProjectId(project.id),
    enabled: !!project.id,
  })

  if (commentsIsLoading) return <div>is Loading...</div>
  if (applicantsIsLoading) return <div>is Loading...</div>
  if (commentsIsLoading) return <div>is Loading...</div>

  return (
    <>
      <section className="flex items-center">
        <>
          <button
            className={`pr-12 pb-2 border-b-2 ${
              isSelected === "comments" && " border-slate-600"
            }`}
            onClick={() => toggleTapHandler("comments")}
          >
            <Image
              height={35}
              width={35}
              src={`${
                isSelected === "comments"
                  ? "/icons/activeCommentIcon.png"
                  : "/icons/commentIcon.png"
              }`}
              alt="댓글 아이콘"
              className="inline-block ml-10 mr-3"
            />
            {comments?.length}
          </button>
          <button
            className={`pr-8 border-b-2 ${
              isSelected === "applicants" && " border-slate-600"
            }`}
            onClick={() => toggleTapHandler("applicants")}
          >
            <Image
              height={40}
              width={40}
              src={`${
                isSelected === "applicants"
                  ? "/icons/activeApplicantsIcon.png"
                  : "/icons/applicantsIcon.png"
              }`}
              alt="신청자 아이콘"
              className="inline-block ml-10 mr-3 pb-3"
            />
            {isWriter ? pendingApplications?.length : project.number_of_people}
          </button>
        </>
        {/* 모두가 볼 수 있는 아이콘 */}
        <FooterPublicIcon
          bookmarks={bookmarks as Tables<"bookmarks">[]}
          bookmarksCount={bookmarksCount as number}
          projectId={project.id}
        />
        {/* 사용자에 따라서 다른 버튼 */}
        <FooterAuthButton project={project} isWriter={isWriter} />
      </section>
      <Spacer y={30} />
      {/* 탭 메뉴에 따라 나오는 컴포넌트 */}
      <section>
        {isSelected === "comments" && <Comments project={project} />}
        {isSelected === "applicants" && applicants && (
          // 신청자 상태값에 따라 나눈 컴포넌트
          <>
            <Applicants
              applicants={applicants}
              status={true}
              project={project}
              isWriter={isWriter}
            />
            <Applicants
              applicants={applicants}
              status={false}
              isWriter={isWriter}
            />
          </>
        )}
      </section>
    </>
  )
}

export default FooterMenus
