import React from "react"
import { useQuery } from "@tanstack/react-query"
import { getCareers } from "../../../api"

const ProfileCareer = ({ profileId }: { profileId: string }) => {
  const {
    data: careers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["careers", profileId],
    queryFn: () => getCareers({ userId: profileId }),
    enabled: !!profileId,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>경력 데이터를 불러오는 중 오류가 발생했습니다</div>
  }

  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-[26px] font-bold">경력</h2>
        </div>

        {careers && careers.length > 0 ? (
          careers.map((job) => (
            <div
              key={job.id}
              className="flex justify-between items-center pt-[30px]"
            >
              <div>
                <div className="flex">
                  <p>
                    {job.period_from} ~ {job.period_to}
                  </p>
                </div>
                <div className="pt-[10px]">
                  <p>{job.employed_status ? "재직중" : "퇴사"}</p>
                </div>
              </div>

              <div className="pl-[100px]">
                <div className="flex">
                  <h2 className="w-[250px] text-xl font-bold">
                    {job.company_name}
                  </h2>
                </div>
                <div className="pt-[10px]">
                  <p>{job.responsibility}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="pt-[30px] pl-[180px] px-[180px]">
            경력 내용이 없습니다.
          </p>
        )}
        <hr className="my-8 border-t-2 border-gray-300" />
      </div>
    </div>
  )
}

export default ProfileCareer
