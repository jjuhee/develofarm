import React from "react"
import { useQuery } from "@tanstack/react-query"
import { getAcademy } from "../../../api"

const ProfileAcademy = ({ profileId }: { profileId: string }) => {
  const {
    data: academies,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["academies", profileId],
    queryFn: () => getAcademy({ userId: profileId }),
    enabled: !!profileId,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>교육/활동 데이터를 불러오는 중 오류가 발생했습니다</div>
  }

  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-[26px] font-bold">교육/활동</h2>
        </div>

        {academies && academies.length > 0 ? (
          academies.map((academy) => (
            <div
              key={academy.id}
              className="flex justify-between items-center pt-[30px]"
            >
              <div className="flex">
                <p>
                  {academy.period_from} ~ {academy.period_to}
                </p>
              </div>

              <div className="pl-[100px]">
                <div className="flex">
                  <h2 className="w-[250px] text-xl font-bold">
                    {academy.academy_name}
                  </h2>
                </div>
                <div className="pt-[10px]">
                  <p>{academy.academy_major}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="pt-[30px] pl-[160px] px-[160px]">
            교육/활동 내용이 없습니다.
          </p>
        )}
        <hr className="my-8 border-t-2 border-gray-300" />
      </div>
    </div>
  )
}

export default ProfileAcademy
