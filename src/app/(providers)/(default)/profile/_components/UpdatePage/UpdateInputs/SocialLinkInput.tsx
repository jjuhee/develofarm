"use client"

import React, { useState } from "react"
import { HiOutlineXMark } from "react-icons/hi2"

const SocialLinkInput = ({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
}) => {
  const [inputValue, setInputValue] = useState(value)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    onChange(e.target.value)
  }

  const handleClear = () => {
    setInputValue("")
    onChange("")
  }

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-[16px] font-bold mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          id={id}
          value={inputValue}
          onChange={handleChange}
          className="border border-[#CCCCCC] rounded-[12px] pl-[25px] font-bold text-[14px] w-[585px] h-[48px]"
          placeholder={`${label.toLowerCase()} 주소를 입력해 주세요.`}
        />
        <button
          type="button"
          onClick={handleClear}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-[#AAAAAA] text-[30px] hover:text-red-500"
        >
          <HiOutlineXMark />
        </button>
      </div>
    </div>
  )
}

export default SocialLinkInput
