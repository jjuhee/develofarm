import React from "react"
import ProfileCareer from "./ProfileCareer"
import ProfileEducation from "./ProfileEducation"
import ProfileAcademy from "./ProfileAcademy"
import ProfileSpec from "./ProfileSpec"
import { useQuery } from "@tanstack/react-query"
import { getUserResumes } from "../../../api"
import { Tables } from "@/types/supabase"

const ProfileResume = ({ profileId }: { profileId: string }) => {
  const {
    data: userResumes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userResumes", profileId],
    queryFn: () => getUserResumes(profileId),
    enabled: !!profileId,
  })

  if (isLoading) {
    return <div className="hidden">Loading...</div>
  }

  if (isError) {
    return <div>유저의 이력서 데이터를 불러오는 중 오류가 발생했습니다</div>
  }

  return (
    <div>
      <div className="flex justify-between items-start">
        <ProfileCareer careers={userResumes?.careers as Tables<"careers">[]} />
        <ProfileEducation
          educations={userResumes?.education as Tables<"education">[]}
        />
      </div>
      <div className="flex justify-between items-start w-[1230px]">
        <ProfileAcademy
          academies={userResumes?.academies as Tables<"academies">[]}
        />
        <ProfileSpec specs={userResumes?.specs as Tables<"specs">[]} />
      </div>
    </div>
  )
}

export default ProfileResume
