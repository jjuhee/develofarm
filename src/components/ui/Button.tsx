import React from "react"

interface Props {
  type?: string
  text: string
  color?: string
  handler?: () => void
}

const Button = ({ type, text, color, handler }: Props) => {
  return (
    <button
      className="bg-black text-white text-[16px] py-[12px] px-[34px] rounded-full"
      onClick={handler}
    >
      {text}
    </button>
  )
}

export default Button
