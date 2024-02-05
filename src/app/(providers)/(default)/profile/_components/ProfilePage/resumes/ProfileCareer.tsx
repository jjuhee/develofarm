import React from "react"
import { Tables } from "@/types/supabase"

const ProfileCareer = ({ careers }: { careers: Tables<"careers">[] }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-[26px] font-bold">경력</h2>
        </div>

        {careers && careers.length > 0 ? (
          careers.map((career) => (
            <div
              key={career.id}
              className="flex justify-between items-center pt-[30px]"
            >
              <div>
                <div className="flex">
                  <p>
                    {career.period_from} ~ {career.period_to}
                  </p>
                </div>
                <div className="pt-[10px]">
                  <p>{career.employed_status ? "재직중" : "퇴사"}</p>
                </div>
              </div>

              <div className="pl-[100px]">
                <div className="flex">
                  <h2 className="w-[250px] text-xl font-bold">
                    {career.company_name}
                  </h2>
                </div>
                <div className="pt-[10px]">
                  <p>{career.responsibility}</p>
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
