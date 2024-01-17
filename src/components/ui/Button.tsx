import React from "react"

interface Props {
  type?: string
  text: string
  handler?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

//absolute bottom-5 right-5

const Button = ({ type, text, handler }: Props) => {
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
