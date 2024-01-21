import React from "react"
import { getMembers } from "../../api"
import ApplicantList from "./ApplicantList"
import MembersInProject from "./MembersInProject"

type Props = {
  applicants: Exclude<Awaited<ReturnType<typeof getMembers>>, null>
  status: boolean
}

const Applicants = ({ applicants, status }: Props) => {
  return (
    <div>
      {status ? (
        <h2 className="text-2xl font-bold mb-5">
          참여 중인 멤버 <span className="text-slate-300">0</span>/
          {applicants.length}
        </h2>
      ) : (
        <h2 className="text-2xl font-bold">신청자 현황</h2>
      )}
      {applicants
        .filter((applicant) => applicant.application_status === status)
        .map((applicant) => {
          return status ? (
            <MembersInProject applicant={applicant} />
          ) : (
            <ApplicantList applicant={applicant} />
          )
        })}
    </div>
  )
}

export default Applicants
