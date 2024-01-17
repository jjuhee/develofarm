"use client"

import React, { useState } from "react"

const ProfileCareerForm = () => {
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
          <h2 className="text-2xl font-bold pt-5 ">경력</h2>
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
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`employmentStatus${index}`}
                  className="form-checkbox h-4 w-4 text-blue-500"
                />
                <label htmlFor={`employmentStatus${index}`}>재직중</label>
              </div>
            </div>
            <div className="pl-[30px] pt-[20px]">
              <div>
                <input
                  type="text"
                  placeholder="회사명"
                  className="w-[250px] h-8 p-1 m-1 border border-black rounded"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="담당 직무"
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

export default ProfileCareerForm
