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
          ? "bg-white text-black border-2 border-black"
          : "bg-black text-white"
      } font-[600] text-[16px] py-2 px-10 rounded-full`}
      onClick={handler}
    >
      {text}
    </button>
  )
}

export default Button
