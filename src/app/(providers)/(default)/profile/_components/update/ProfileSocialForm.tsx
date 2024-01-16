import React from "react"

const ProfileSocialForm = () => {
  return (
    <div className="flex justify-between items-center w-[800px]">
      <div>
        <h2 className="flex text-lg font-semibold h-[40px]">Blog</h2>
        <input
          type="text"
          className="w-[250px] h-8 p-1 m-1 border border-black rounded"
          placeholder="https://velog.io/@"
        />
      </div>
      <div>
        <h2 className="flex text-lg font-semibold h-[40px]">Github </h2>
        <input
          type="text"
          className="w-[250px] h-8 p-1 m-1 border border-black rounded"
          placeholder="https://github.com/"
        />
      </div>
    </div>
  )
}

export default ProfileSocialForm
