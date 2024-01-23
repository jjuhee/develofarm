import React from "react"
import { CiBookmark } from "react-icons/ci"
import { IoShareSocialOutline } from "react-icons/io5"

const FooterPublicIcon = () => {
  return (
    <>
      <span className="ml-auto pr-5">
        <span>
          <CiBookmark size={30} className="inline-block" />
        </span>
        5
      </span>
      <span className="pr-5">
        <IoShareSocialOutline size={30} />
      </span>
    </>
  )
}

export default FooterPublicIcon
