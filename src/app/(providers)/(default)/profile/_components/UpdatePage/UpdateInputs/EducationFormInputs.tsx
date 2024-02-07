import React from "react"
import { Tables } from "@/types/supabase"
import { HiOutlineXMark } from "react-icons/hi2"
import Checkbox from "@/components/ui/Checkbox"

interface EducationFormInputsProps {
  educationData: Tables<"education">[]
  formIndex: number
  isHidden: boolean
  handleInputChange: (
    index: number,
    field: keyof Tables<"education">,
    value: string | boolean,
  ) => void
  handleDeleteForm: () => void
}

const EducationFormInputs: React.FC<EducationFormInputsProps> = ({
  educationData,
  formIndex,
  isHidden,
  handleInputChange,
  handleDeleteForm,
}) => {
  if (isHidden) {
    return null // 숨겨진 입력이라면 아무것도 렌더링하지 않음
  }

  const edu = educationData[formIndex]

  return (
    <div>
      <div className="flex justify-between items-start pt-[30px]">
        <div className="pt-[5px]">
          <input
            type="date"
            value={edu.period_from as string}
            onChange={(e) =>
              handleInputChange(formIndex, "period_from", e.target.value)
            }
            className="text-[16px] font-bold cursor-pointer"
          />
          <span> ~ </span>
          <input
            type="date"
            value={edu.period_to as string}
            onChange={(e) =>
              handleInputChange(formIndex, "period_to", e.target.value)
            }
            className="text-[16px] font-bold cursor-pointer"
          />
          <div className="flex">
            {[
              { id: "inProgress", label: "재학중", value: "1" },
              { id: "graduated", label: "졸업", value: "2" },
              { id: "withdrawn", label: "중퇴", value: "3" },
              { id: "onLeave", label: "휴학", value: "4" },
            ].map(({ id, label, value }) => (
              <div
                key={id}
                className="pt-[30px] gap-[5px] pl-[10px] flex justify-between items-center "
              >
                <Checkbox
                  id={`eduCheckbox_${formIndex}_${id}`}
                  name="graduated"
                  value={edu.graduated === value}
                  handler={() =>
                    handleInputChange(formIndex, "graduated", value)
                  }
                />
                <label
                  htmlFor={`eduCheckbox_${formIndex}_${id}`}
                  className="cursor-pointer text-[14px]"
                >
                  {label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="relative flex items-center">
            <input
              type="text"
              value={edu.school_name as string}
              onChange={(e) =>
                handleInputChange(formIndex, "school_name", e.target.value)
              }
              className="w-[220px] text-[16px] font-bold p-1"
              placeholder="학교명"
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
              value={edu.school_major as string}
              onChange={(e) =>
                handleInputChange(formIndex, "school_major", e.target.value)
              }
              className="w-[220px] text-[14px] p-1"
              placeholder="전공 및 학위"
              maxLength={10}
            />
          </div>
        </div>
      </div>
      <hr className="my-8 border-t-2 border-gray-300" />
    </div>
  )
}

export default EducationFormInputs
