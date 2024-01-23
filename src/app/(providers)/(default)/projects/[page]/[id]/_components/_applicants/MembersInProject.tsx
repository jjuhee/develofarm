import React from "react"
import { getMembers } from "../../api"
import Image from "next/image"

type Props = {
  applicant: Exclude<Awaited<ReturnType<typeof getMembers>>, null>[number]
}

const MembersInProject = ({ applicant }: Props) => {
  return (
    <section key={applicant.id} className="">
      <p>
        <Image
          width={48}
          height={48}
          src={`${applicant.users?.avatar_url}`}
          alt="댓글 작성자 이미지"
          className="w-12 h-12 rounded-full object-cover inline-block"
        />
      </p>
      <p>{applicant.users?.user_nickname}</p>
    </section>
  )
}

export default MembersInProject
