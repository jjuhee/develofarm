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
          ? `bg-white text-[${color}] border-2 border-[${color}] hover:bg-[${color}] hover:text-white`
          : `bg-[${color}] text-white hover:opacity-70`
      } font-[700] text-[17px] py-2 px-8 rounded-3xl transition-all duration-300 `}
      onClick={handler}
    >
      {text}
    </button>
  )
}

export default Button
