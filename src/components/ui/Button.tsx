import React from "react"

interface Props {
  buttonType?: "button" | "submit" | "reset" | undefined
  type?: "border" | undefined
  text: string
  color?: string
  handler?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({
  buttonType = "button",
  type,
  text,
  color,
  handler,
}: Props) => {
  return (
    <button
      type={`${buttonType}`}
      className={`${
        type === "border"
          ? `bg-white text-[#2D2D2D] border-2 border-[#A6A6A6] hover:bg-[#EEEEEE] hover:text-[#2D2D2D] hover:border-[#2D2D2D] active:bg-[#CCCCCC] active:border-[#CCCCCC]`
          : `bg-main-lime text-black hover:bg-[#636366] hover:text-main-lime active:bg-[#363639]`
      } font-[700] text-[17px] py-2 px-8 rounded-lg transition-all duration-300 `}
      onClick={handler}
    >
      {text}
    </button>
  )
}

export default Button
