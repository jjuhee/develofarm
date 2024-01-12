import React from "react"

const ProfileEducation = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">학력</h2>
        </div>

        <div className="flex justify-between items-center pt-[30px]">
          <div>
            <div className="flex">
              <p>YYYY.MM.DD</p>
              <p className="mx-[5px]"> ~ </p>
              <p>YYYY.MM.DD</p>
            </div>
            <div className="pt-[10px]">
              <p>재학중</p>
            </div>
          </div>

          <div className="pl-[100px]">
            <div className="flex">
              <h2 className="w-[250px] text-xl font-bold">학교명</h2>
            </div>
            <div className="pt-[10px]">
              <p>전공 및 학위</p>
            </div>
          </div>
        </div>
        <hr className="my-8 border-t-2 border-gray-300" />
      </div>
    </div>
  )
}

export default ProfileEducation
