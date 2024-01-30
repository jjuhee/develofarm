import React from "react"
import { getMembers } from "../../api"
import ApplicantList from "./ApplicantList"
import MembersInProject from "./MembersInProject"
import { Tables } from "@/types/supabase"

type Props = {
  applicants: Exclude<Awaited<ReturnType<typeof getMembers>>, null>
  status: boolean
  project?: Tables<"projects">
  isWriter: boolean
}

const Applicants = ({ applicants, status, project, isWriter }: Props) => {
  /**
   *@ param 참여 중인 멤버 인원 수 */
  const applyApplications = applicants?.filter(
    (applicant) => applicant.application_status === true,
  )

  /**
   *@ param 신청 대기 중인 인원 수 */
  const pendingApplications = applicants?.filter(
    (applicant) => applicant.application_status === false,
  )

  return (
    <div className="overflow-x-auto scrollbar-track-black scrollbar-thin">
      {status ? (
        <h2 className="text-2xl font-bold mb-5">
          참여 중인 멤버
          <span className="text-slate-300 ml-5 px-1">
            {applyApplications.length}
          </span>
          /<span className="px-1">{project?.number_of_people}</span>
        </h2>
      ) : (
        <h2 className="text-2xl font-bold clear-left">
          신청자 현황
          <span className="ml-3">{pendingApplications.length}</span>
        </h2>
      )}
      {applicants
        .filter((applicant) => applicant.application_status === status)
        .map((applicant) => {
          return status ? (
            <MembersInProject applicant={applicant} key={applicant.id} />
          ) : (
            <ApplicantList
              key={applicant.id}
              applicants={applicants}
              applicant={applicant}
              isWriter={isWriter}
            />
          )
        })}
    </div>
  )
}

export default Applicants
