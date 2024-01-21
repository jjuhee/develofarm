import React from "react"
import { useQuery } from "@tanstack/react-query"
import { getEducation } from "../../../api"

const ProfileEducation = ({ profileId }: { profileId: string }) => {
  const {
    data: education,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["education", profileId],
    queryFn: () => getEducation({ userId: profileId }),
    enabled: !!profileId,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>최종학력 데이터를 불러오는 중 오류가 발생했습니다</div>
  }

  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-[26px] font-bold">최종학력</h2>
        </div>

        {education && education.length > 0 ? (
          <div className="flex justify-between items-center pt-[30px]">
            <div>
              <div className="flex">
                <p>
                  {education[0].period_from} ~ {education[0].period_to}
                </p>
              </div>
              <div className="pt-[10px]">
                <p>
                  {(() => {
                    const school = education[0]
                    switch (school.graduated) {
                      case "1":
                        return "재학중"
                      case "2":
                        return "졸업"
                      case "3":
                        return "중퇴"
                      case "4":
                        return "휴학"
                      default:
                        return school.graduated
                    }
                  })()}
                </p>
              </div>
            </div>

            <div className="pl-[100px]">
              <div className="flex">
                <h2 className="w-[250px] text-xl font-bold">
                  {education[0].school_name}
                </h2>
              </div>
              <div className="pt-[10px]">
                <p>{education[0].school_major}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="pt-[30px] pl-[160px] px-[160px]">
            최종학력 내용이 없습니다.
          </p>
        )}

        <hr className="my-8 border-t-2 border-gray-300" />
      </div>
    </div>
  )
}

export default ProfileEducation
