import React from "react"
import { Tables } from "@/types/supabase"

const ProfileAcademy = ({
  academies,
}: {
  academies: Tables<"academies">[]
}) => {
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
              <div>
                <div className="flex">
                  <p>
                    {academy.period_from} ~ {academy.period_to}
                  </p>
                </div>
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
          <p className="pt-[20px] px-[210px]">교육/활동 내용이 없습니다.</p>
        )}
        <hr className="my-8 border-t-2 border-gray-300" />
      </div>
    </div>
  )
}

export default ProfileAcademy
