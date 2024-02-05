import { Tables } from "@/types/supabase"
import dayjs from "dayjs"
import Image from "next/image"
import React from "react"
import Link from "next/link"

type Props = {
  project: Tables<"projects">
  user: Tables<"users">
}
const ProjectWriterInfo = ({ project, user }: Props) => {
  // 타임스탬프로 들어간 날짜 포맷
  // ex) 2024-01-12T14:29:25.362227 -> 2024.01.12 14:29:25
  const FORMATTED_DATE = dayjs(project?.created_at).format(
    "YYYY.MM.DD HH:mm:ss",
  )

  const updateDate = dayjs(project?.updated_at).format("YYYY.MM.DD HH:mm:ss")

  return (
    <>
      <li>
        <Link
          href={`/profile/${project.user_id}`}
          className="hover:brightness-50 duration-300"
        >
          <Image
            width={48}
            height={48}
            src={`${user.avatar_url}`}
            alt="프로필이미지"
            className="rounded-full object-cover"
          />
        </Link>
      </li>
      <li>
        <span className="pr-2">작성자</span>
        {user.user_nickname}
      </li>
      <li>
        {project.updated_at === null
          ? FORMATTED_DATE
          : `${updateDate} (수정됨)`}
      </li>
      <li>조회수 {project.views}</li>
    </>
  )
}

export default ProjectWriterInfo
