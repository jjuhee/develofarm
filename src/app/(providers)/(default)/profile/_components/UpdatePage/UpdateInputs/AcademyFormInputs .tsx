import React from "react"
import { Tables } from "@/types/supabase"
import { HiOutlineXMark } from "react-icons/hi2"

const AcademyFormInputs = ({
  academyData,
  formIndex,
  isHidden,
  handleInputChange,
  handleDeleteForm,
}: {
  academyData: Tables<"academies">[]
  formIndex: number
  isHidden: boolean
  handleInputChange: (
    index: number,
    field: keyof Tables<"academies">,
    value: string | boolean,
  ) => void
  handleDeleteForm: () => void
}) => {
  return (
    <div key={formIndex}>
      {!isHidden && (
        <>
          <div className="flex justify-between items-start pt-[30px]">
            <div className="pt-[5px]">
              <input
                type="date"
                placeholder="From"
                value={academyData[formIndex]?.period_from || ""}
                onChange={(e) =>
                  handleInputChange(formIndex, "period_from", e.target.value)
                }
                className="cursor-pointer"
              />
              <span> ~ </span>
              <input
                type="date"
                placeholder="To"
                value={academyData[formIndex]?.period_to || ""}
                onChange={(e) =>
                  handleInputChange(formIndex, "period_to", e.target.value)
                }
                className="cursor-pointer"
              />
            </div>

            <div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={academyData[formIndex]?.academy_name || ""}
                  onChange={(e) =>
                    handleInputChange(formIndex, "academy_name", e.target.value)
                  }
                  className="w-[250px] text-xl font-bold p-1"
                  placeholder="활동명"
                  maxLength={10}
                />
                <button
                  type="button"
                  onClick={handleDeleteForm}
                  className="text-[#AAAAAA] text-[30px] hover:text-red-500"
                >
                  <HiOutlineXMark />
                </button>
              </div>
              <div className="pt-[20px]">
                <input
                  type="text"
                  value={academyData[formIndex]?.academy_major || ""}
                  onChange={(e) =>
                    handleInputChange(
                      formIndex,
                      "academy_major",
                      e.target.value,
                    )
                  }
                  className="p-1"
                  placeholder="활동내용"
                  maxLength={10}
                />
              </div>
            </div>
          </div>
          <hr className="my-8 border-t-2 border-gray-300" />
        </>
      )}
    </div>
  )
}

export default AcademyFormInputs
