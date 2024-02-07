import React from "react"
import { Tables } from "@/types/supabase"
import { HiOutlineXMark } from "react-icons/hi2"

const SpecFormInputs = ({
  specData,
  formIndex,
  isHidden,
  handleInputChange,
  handleDeleteForm,
}: {
  specData: any
  formIndex: number
  isHidden: boolean
  handleInputChange: (
    index: number,
    field: keyof Tables<"specs">,
    value: string | boolean,
  ) => void
  handleDeleteForm: () => void
}) => {
  const spec = specData[formIndex]

  return (
    <div key={spec.id}>
      {!isHidden && (
        <>
          <div className="flex justify-between items-start pt-[30px] pb-[49px]">
            <input
              type="date"
              value={spec.spec_date as string}
              onChange={(e) =>
                handleInputChange(formIndex, "spec_date", e.target.value)
              }
              className="pt-[5px] text-[16px] font-bold cursor-pointer"
            />

            <div className="relative flex items-center">
              <input
                type="text"
                value={spec.spec_name as string}
                onChange={(e) =>
                  handleInputChange(formIndex, "spec_name", e.target.value)
                }
                className="w-[220px] text-[16px] font-bold p-1"
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
          </div>
          <hr className="my-8 border-t-2 border-gray-300" />
        </>
      )}
    </div>
  )
}

export default SpecFormInputs
