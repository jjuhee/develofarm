import React from "react"

interface Props {
  id: string
  value: boolean
  name?: string
  handler: (
    e: React.ChangeEvent<HTMLInputElement>,
    position_id?: string,
  ) => void
}

const Checkbox = ({ id, value, handler, name }: Props) => {
  return (
    <input
      id={id}
      type="checkbox"
      checked={value}
      onChange={handler}
      className="
      peer relative appearance-none shrink-0 w-4 h-4 border-2 border-[#666666] rounded-[3px] bg-white
      focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-main-lime
      checked:bg-black checked:border-0
      disabled:border-steel-400 disabled:bg-steel-400
      checked:bg-[url('/icons/checked.png')] bg-no-repeat bg-center cursor-pointer
    "
    />
  )
}

export default Checkbox
