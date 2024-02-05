import React from "react"
import { Tables } from "@/types/supabase"

const ProfileEducation = ({
  educations,
}: {
  educations: Tables<"education">[]
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-[26px] font-bold">학력</h2>
        </div>

        {educations && educations.length > 0 ? (
          educations.map((education) => (
            <div
              key={education.id}
              className="flex justify-between items-center pt-[30px]"
            >
              <div>
                <div className="flex">
                  <p>
                    {education.period_from} ~ {education.period_to}
                  </p>
                </div>
                <div className="pt-[10px]">
                  <p>
                    {(() => {
                      const school = education
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
                    {education.school_name}
                  </h2>
                </div>
                <div className="pt-[10px]">
                  <p>{education.school_major}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="pt-[30px] pl-[180px] px-[180px]">
            학력 내용이 없습니다.
          </p>
        )}
        <hr className="my-8 border-t-2 border-gray-300" />
      </div>
    </div>
  )
}

export default ProfileEducation
