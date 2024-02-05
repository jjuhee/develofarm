import { Tables } from "@/types/supabase"
import React, { SetStateAction, useEffect, useState } from "react"
import Comments from "../_comments/Comments"
import Spacer from "@/components/ui/Spacer"
import FooterAuthButton from "./FooterAuthButton"
import useUserStore from "@/store/user"
import FooterPublicIcon from "./FooterPublicIcon"
import { useQuery } from "@tanstack/react-query"
import { getComments, getMembers } from "../../api"
import { getBookmarks, getBookmarksByProjectId, getProject } from "../../../api"
import Image from "next/image"
import ParticipatingMembers from "../_applicants/ParticipatingMembers"
import ApplyingMembers from "../_applicants/ApplyingMembers"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

type Props = {
  project: Exclude<Awaited<ReturnType<typeof getProject>>, null>
}

const FooterMenus = ({ project }: Props) => {
  /**
   *@ param 댓글목록과 신청자목록에 상태값을 담은 변수*/
  const searchParams = useSearchParams()
  const search = searchParams.get("tab")
  const [tab, setTab] = useState<string>(search || "comments")

  /**
   *@ param1 현재 로그인한 유저 정보를 담은 변수
   *@ param2 글 작성자가 현재 로그인한 유저랑 같은지 판별하는 변수*/
  const user = useUserStore((state) => state.user)
  const isWriter = user?.id === project.user_id

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
   *@ param 참여 중인 멤버 인원 수 */
  const participatingApplications =
    applicants?.filter((applicant) => applicant.application_status === true) ||
    []

  /**
   *@ param 신청 대기 중인 인원 수 */
  const applyingApplications =
    applicants?.filter((applicant) => applicant.application_status === false) ||
    []

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

  /**
   * 탭에 받아오는 search값이 바뀔 때 마다 렌더링 해줌
   * search 값이 null 값인 경우 "comments" */
  useEffect(() => {
    setTab(search || "comments")
  }, [search])

  if (commentsIsLoading)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Image src={"/images/load.gif"} alt="load" width={200} height={200} />
      </div>
    )
  if (applicantsIsLoading)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Image src={"/images/load.gif"} alt="load" width={200} height={200} />
      </div>
    )

  return (
    <>
      <section className="flex items-center">
        <>
          <Link
            className={`flex items-center pr-12 pb-3 border-b-2 ${
              tab === "comments" && " border-slate-600"
            }`}
            scroll={false}
            href="?tab=comments"
          >
            <Image
              height={35}
              width={35}
              src={`${
                tab === "comments"
                  ? "/icons/activeCommentIcon.png"
                  : "/icons/commentIcon.png"
              }`}
              alt="댓글 아이콘"
              className="inline-block ml-10 mr-3"
            />
            {comments?.length}
          </Link>
          <Link
            className={`pr-8 pb-1 border-b-2 ${
              tab === "applicants" && " border-slate-600"
            }`}
            scroll={false}
            href="?tab=applicants"
          >
            <Image
              height={40}
              width={40}
              src={`${
                tab === "applicants"
                  ? "/icons/activeApplicantsIcon.png"
                  : "/icons/applicantsIcon.png"
              }`}
              alt="신청자 아이콘"
              className="inline-block ml-10 mr-3 pb-3"
            />
            {participatingApplications.length} / {applyingApplications.length}
          </Link>
        </>
        {/* 모두가 볼 수 있는 아이콘 */}
        <FooterPublicIcon
          bookmarks={bookmarks as Tables<"bookmarks">[]}
          bookmarksCount={bookmarksCount as number}
          project={project}
        />
        {/* 사용자에 따라서 다른 버튼 */}
        <FooterAuthButton project={project} isWriter={isWriter} />
      </section>
      <Spacer y={30} />
      {/* 탭 메뉴에 따라 나오는 컴포넌트 */}
      <section>
        {tab === "comments" && <Comments project={project} />}
        {tab === "applicants" && applicants && (
          // 신청자 상태값에 따라 나눈 컴포넌트
          <>
            <ParticipatingMembers
              participatingApplications={participatingApplications}
              project={project}
              isWriter={isWriter}
            />
            <ApplyingMembers
              applyingApplications={applyingApplications}
              participatingApplications={participatingApplications}
              isWriter={isWriter}
            />
          </>
        )}
      </section>
    </>
  )
}

export default FooterMenus
