import React from "react"
import { Tables } from "@/types/supabase"

const ProfileSpec = ({ specs }: { specs: Tables<"specs">[] }) => {
  return (
    <div className="flex justify-between items-center ">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-[18px] font-bold">자격/어학/수상</h2>
        </div>

        {specs && specs.length > 0 ? (
          specs.map((spec) => (
            <div
              key={spec.id}
              className="flex justify-between items-start h-[60px] w-[550px] pt-[30px] pb-[35px]"
            >
              <div className="flex">
                <p className="text-[16px] font-bold">{spec.spec_date}</p>
              </div>

              <div className="flex pl-[100px]">
                <h2 className="w-[250px] text-[16px] font-bold">
                  {spec.spec_name}
                </h2>
              </div>
            </div>
          ))
        ) : (
          <p className="pt-[20px] px-[190px] text-[14px]">
            자격/어학/수상 내용이 없습니다.
          </p>
        )}
        <hr className="my-8 border-t-2 border-gray-300" />
      </div>
    </div>
  )
}

export default ProfileSpec
