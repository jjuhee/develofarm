"use client"

import React, { useState } from "react"

const ProfileAcademyForm = () => {
  const [careerEntries, setCareerEntries] = useState([{}])

  const addCareerEntry = () => {
    setCareerEntries([...careerEntries, {}])
  }

  const removeCareerEntry = (index: number) => {
    const updatedEntries = [...careerEntries]
    updatedEntries.splice(index, 1)
    setCareerEntries(updatedEntries)
  }

  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold pt-5 ">교육/활동</h2>
          <div>
            {careerEntries.length > 1 && (
              <button
                className="inline-block px-3 py-1 mt-[20px] mr-2 border border-black-500 rounded-full text-red-500"
                style={{ borderColor: "#f00808" }}
                onClick={() => removeCareerEntry(careerEntries.length - 1)}
              >
                삭제
              </button>
            )}
            <button
              className="inline-block px-3 py-1 mt-[20px] border border-black-500 rounded-full"
              style={{ borderColor: "#000" }}
              onClick={addCareerEntry}
            >
              + 추가하기
            </button>
          </div>
        </div>

        {careerEntries.map((entry, index) => (
          <div key={index} className="flex justify-between items-center">
            <div>
              <div className="flex">
                <input type="date" className="w-32 h-8" />
                <p className="mx-[5px] mt-[3px]"> ~ </p>
                <input type="date" className="w-32 h-8" />
              </div>
            </div>
            <div className="pl-[30px] pt-[20px]">
              <div>
                <input
                  type="text"
                  placeholder="활동명"
                  className="w-[250px] h-8 p-1 m-1 border border-black rounded"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="활동 내용"
                  className="w-[250px] h-8 p-1 m-1 border border-black rounded"
                />
              </div>
            </div>
          </div>
        ))}

        <hr className="my-8 border-t-2 border-gray-300" />
      </div>
    </div>
  )
}

export default ProfileAcademyForm
