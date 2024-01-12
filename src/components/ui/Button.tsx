import React from "react"

interface Props {
  type?: string
  text: string
}

const Button = ({ type, text }: Props) => {
  return (
    <button className="absolute bottom-5 right-5 bg-black text-white text-[16px] py-[12px] px-[34px] rounded-full">
      {text}
    </button>
  )
}

export default Button
