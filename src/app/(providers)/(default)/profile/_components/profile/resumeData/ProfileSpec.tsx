import React from "react"

const ProfileSpec = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">자격/어학/수상</h2>
        </div>

        <div className="flex justify-between items-center pt-[30px]">
          <div>
            <div className="flex">
              <p>YYYY.MM.DD</p>
              <p className="mx-[5px]"> ~ </p>
              <p>YYYY.MM.DD</p>
            </div>
          </div>

          <div className="pl-[100px]">
            <div className="flex">
              <h2 className="w-[250px] text-xl font-bold">활동명</h2>
            </div>
            <div className="pt-[10px]">
              <p>활동 내용</p>
            </div>
          </div>
        </div>
        <hr className="my-8 border-t-2 border-gray-300" />
      </div>
    </div>
  )
}

export default ProfileSpec
