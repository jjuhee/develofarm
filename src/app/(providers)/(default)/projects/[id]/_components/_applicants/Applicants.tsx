import React from "react"
import { getMembers } from "../../api"
import ApplicantList from "./ApplicantList"
import MembersInProject from "./MembersInProject"
import { Tables } from "@/types/supabase"

type Props = {
  applicants: Exclude<Awaited<ReturnType<typeof getMembers>>, null>
  status: boolean
  project?: Tables<"projects">
}

const Applicants = ({ applicants, status, project }: Props) => {
  return (
    <>
      {status ? (
        <h2 className="text-2xl font-bold mb-5">
          참여 중인 멤버
          <span className="text-slate-300 ml-2">
            {
              applicants.filter(
                (applicant) => applicant.application_status === true,
              ).length
            }
          </span>
          /{project?.number_of_people}
        </h2>
      ) : (
        <h2 className="text-2xl font-bold">
          신청자 현황
          <span className="ml-3">
            {
              applicants.filter(
                (applicant) => applicant.application_status === false,
              ).length
            }
          </span>
        </h2>
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
    </>
  )
}

export default Applicants
