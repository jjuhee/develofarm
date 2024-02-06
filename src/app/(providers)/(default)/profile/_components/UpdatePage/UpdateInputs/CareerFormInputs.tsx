import React from "react"
import { Tables } from "@/types/supabase"
import { HiOutlineXMark } from "react-icons/hi2"
import Checkbox from "@/components/ui/Checkbox"

type Props = {
  careerData: Tables<"careers">[]
  formIndex: number
  isHidden: boolean
  handleInputChange: (
    index: number,
    field: keyof Tables<"careers">,
    value: string | boolean,
  ) => void
  handleDeleteForm: () => void
}

const CareerFormInputs: React.FC<Props> = ({
  careerData,
  formIndex,
  isHidden,
  handleInputChange,
  handleDeleteForm,
}) => {
  if (isHidden) {
    return null // 입력이 숨겨져 있으면 null을 반환하여 렌더링하지 않음
  }

  return (
    <div key={formIndex}>
      <div className="flex justify-between items-start pt-[30px]">
        <div className="pt-[5px]">
          <input
            type="date"
            placeholder=""
            value={careerData[formIndex]?.period_from || ""}
            onChange={(e) =>
              handleInputChange(formIndex, "period_from", e.target.value)
            }
            className="cursor-pointer"
          />
          <span> ~ </span>
          <input
            type="date"
            placeholder=""
            value={careerData[formIndex]?.period_to || ""}
            onChange={(e) =>
              handleInputChange(formIndex, "period_to", e.target.value)
            }
            className="cursor-pointer"
          />
          <div className="pt-[30px]">
            <label
              htmlFor={`employed_status_${formIndex}`}
              className="cursor-pointer"
            >
              <Checkbox
                id={`employed_status_${formIndex}`}
                value={careerData[formIndex]?.employed_status}
                handler={(e) =>
                  handleInputChange(
                    formIndex,
                    "employed_status",
                    e.target.checked,
                  )
                }
              />
              재직중
            </label>
          </div>
        </div>

        <div>
          <div className="relative flex items-center">
            <input
              type="text"
              value={careerData[formIndex]?.company_name || ""}
              onChange={(e) =>
                handleInputChange(formIndex, "company_name", e.target.value)
              }
              className="w-[250px] text-xl font-bold p-1"
              placeholder="회사명"
              maxLength={10}
            />
            <button
              type="button"
              onClick={handleDeleteForm} // handleDeleteForm 함수를 직접 호출
              className="text-[#AAAAAA] text-[30px] hover:text-red-500"
            >
              <HiOutlineXMark />
            </button>
          </div>
          <div className="pt-[20px]">
            <input
              type="text"
              value={careerData[formIndex]?.responsibility || ""}
              onChange={(e) =>
                handleInputChange(formIndex, "responsibility", e.target.value)
              }
              className="p-1"
              placeholder="담당직무"
              maxLength={10}
            />
          </div>
        </div>
      </div>
      <hr className="my-8 border-t-2 border-gray-300" />
    </div>
  )
}

export default CareerFormInputs
