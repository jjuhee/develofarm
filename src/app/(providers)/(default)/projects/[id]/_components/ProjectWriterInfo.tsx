import { Tables } from "@/types/supabase"
import dayjs from "dayjs"
import Image from "next/image"
import React from "react"

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
        <Image
          width={48}
          height={48}
          src={`${user.avatar_url}`}
          alt="프로필이미지"
          className="w-12 h-12 rounded-full object-cover"
        />
      </li>
      <li>
        <span className="pr-2">작성자</span>
        {user.user_nickname}
      </li>
      <li>{updateDate ? `${updateDate} (수정됨)` : FORMATTED_DATE}</li>
      <li>조회수 190</li>
    </>
  )
}

export default ProjectWriterInfo
