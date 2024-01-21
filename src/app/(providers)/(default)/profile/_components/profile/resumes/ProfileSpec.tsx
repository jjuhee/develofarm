import React from "react"
import { useQuery } from "@tanstack/react-query"
import { getSpecs } from "../../../api"

const ProfileSpec = ({ profileId }: { profileId: string }) => {
  const {
    data: specs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["specs", profileId],
    queryFn: () => getSpecs({ userId: profileId }),
    enabled: !!profileId,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>자격/어학/수상 데이터를 불러오는 중 오류가 발생했습니다</div>
  }

  return (
    <div className="flex justify-between items-center ">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-[26px] font-bold">자격/어학/수상</h2>
        </div>

        {specs && specs.length > 0 ? (
          specs.map((spec) => (
            <div
              key={spec.id}
              className="flex justify-between items-center h-[60px] w-[580px]"
            >
              <div className="flex">
                <p>{spec.spec_date}</p>
              </div>

              <div className="flex pl-[100px]">
                <h2 className="w-[250px] text-xl font-bold">
                  {spec.spec_name}
                </h2>
              </div>
            </div>
          ))
        ) : (
          <p className="pt-[30px] pl-[135px] px-[135px]">
            자격/어학/수상 내용이 없습니다.
          </p>
        )}
        <hr className="my-8 border-t-2 border-gray-300" />
      </div>
    </div>
  )
}

export default ProfileSpec
