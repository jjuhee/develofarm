import React from "react"

interface Props {
  type?: string
  text: string
  color?: string
  handler?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({ type, text, color, handler }: Props) => {
  return (
    <button
      className={`${
        type === "border"
          ? "bg-white text-[#297A5F] border-2 border-[#297A5F"
          : "bg-[#297A5F] text-white"
      } font-[600] text-[16px] py-2 px-10 rounded-full hover:opacity-70 transition-all duration-300`}
      onClick={handler}
    >
      {text}
    </button>
  )
}

export default Button
