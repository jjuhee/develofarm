import { Tables } from "@/types/supabase"
import React, { useEffect, useState } from "react"
import Comments from "../_comments/Comments"
import Spacer from "@/components/ui/Spacer"
import FooterAuthButton from "./FooterAuthButton"
import useUserStore from "@/store/user"
import FooterPublicIcon from "./FooterPublicIcon"
import { useQuery } from "@tanstack/react-query"
import { getComments, getMembers } from "../../api"
import { getBookmarks, getBookmarksByProjectId } from "../../../api"
import Image from "next/image"
import ParticipatingMembers from "../_applicants/ParticipatingMembers"
import ApplyingMembers from "../_applicants/ApplyingMembers"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { TProjectType } from "@/types/extendedType"

type Props = {
  project: TProjectType
}

const FooterMenus = ({ project }: Props) => {
  const searchParams = useSearchParams()
  const search = searchParams.get("tab")
  const [tab, setTab] = useState<string>(search || "comments")
  const user = useUserStore((state) => state.user)
  const isWriter = user?.id === project.user_id

  const { data, isLoading: commentsIsLoading } = useQuery({
    queryKey: ["comments", { projectId: project.id }],
    queryFn: () => getComments(project.id),
  })

  const comments = data?.filter((comment) => comment.del_yn === false)

  const { data: applicants, isLoading: applicantsIsLoading } = useQuery({
    queryKey: ["applicants", { projectId: project.id }],
    queryFn: () => getMembers(project.id),
  })

  const participatingApplications =
    applicants?.filter((applicant) => applicant.application_status === true) ||
    []

  const applyingApplications =
    applicants?.filter((applicant) => applicant.application_status === false) ||
    []

  const { data: bookmarks } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: getBookmarks,
  })

  const { data: bookmarksCount } = useQuery({
    queryKey: ["bookmarksCount", { bookmarks: bookmarks }],
    queryFn: () => getBookmarksByProjectId(project.id),
    enabled: !!project.id,
  })

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
            className={`flex items-center pr-8 lg:pr-12 pb-3 border-b-2 ${
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
              className="inline-block ml-6 lg:ml-10 mr-3"
            />
            <span className="lg:hidden">
              {comments && comments.length >= 999
                ? comments.length + "+"
                : comments?.length}
            </span>
            <span className="hidden lg:block">{comments?.length}</span>
          </Link>
          <Link
            className={`pr-3 lg:pr-8 pb-1 border-b-2 ${
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
              className="inline-block ml-5 lg:ml-10 mr-3 pb-3"
            />
            {participatingApplications.length} / {applyingApplications.length}
          </Link>
        </>
        <FooterPublicIcon
          bookmarks={bookmarks as Tables<"bookmarks">[]}
          bookmarksCount={bookmarksCount as number}
          project={project}
        />
        <FooterAuthButton project={project} isWriter={isWriter} />
      </section>
      <Spacer y={30} />
      <section>
        {tab === "comments" && <Comments project={project} />}
        {tab === "applicants" && applicants && (
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
