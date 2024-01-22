"use client"

import React, { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getSocialLinks, updateSocialLinks, addSocialLinks } from "../../api"
import { HiOutlineXMark } from "react-icons/hi2"

const ProfileSocialForm = ({ profileId }: { profileId: string }) => {
  const {
    data: social_links,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["social_links", profileId],
    queryFn: () => getSocialLinks({ userId: profileId }),
    enabled: !!profileId,
  })

  const [updatedSocialLinks, setUpdatedSocialLinks] = useState({
    blog_url: "",
    github_url: "",
  })

  const [newSocialLinks, setNewSocialLinks] = useState({
    newBlogUrl: "",
    newGithubUrl: "",
  })

  useEffect(() => {
    if (social_links && social_links.length > 0) {
      setUpdatedSocialLinks({
        blog_url: social_links[0].blog_url || "",
        github_url: social_links[0].github_url || "",
      })
    }
  }, [social_links])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdatedSocialLinks((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleClearInput = (
    inputName: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    setUpdatedSocialLinks((prev) => ({
      ...prev,
      [inputName]: "",
    }))
  }

  const handleAddInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewSocialLinks((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddSocialLinks = async () => {
    const addedData = await addSocialLinks(profileId, newSocialLinks)

    if (addedData) {
      refetch()
      setNewSocialLinks({
        newBlogUrl: "",
        newGithubUrl: "",
      })
    }
  }

  const handleUpdateSocialLinks = async () => {
    const updatedData = await updateSocialLinks(profileId, updatedSocialLinks)

    if (updatedData) {
      refetch()
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>소셜 데이터를 불러오는 중 오류가 발생했습니다</div>
  }

  return (
    <div>
      {social_links && social_links.length > 0 ? (
        <div className="flex justify-between items-center">
          <div>
            <h2 className="flex text-[20px] font-bold h-[40px]">Blog</h2>
            <div className="flex relative items-center">
              <input
                type="url"
                name="blog_url"
                value={updatedSocialLinks.blog_url}
                onChange={handleInputChange}
                className="border border-[#CCCCCC] rounded-[12px] pl-[25px] font-bold text-[14px] w-[590px] h-[48px]"
                placeholder="블로그 주소를 입력하세요..."
              />
              <button
                onClick={(e) => handleClearInput("blog_url", e)}
                className="absolute right-[15px] top-[10px] text-[#AAAAAA] text-[30px] hover:text-red-500"
              >
                <HiOutlineXMark />
              </button>
            </div>
          </div>
          <div>
            <h2 className="flex text-[20px] font-bold h-[40px]">Github</h2>
            <div className="flex relative items-center">
              <input
                type="url"
                name="github_url"
                value={updatedSocialLinks.github_url}
                onChange={handleInputChange}
                className="border border-[#CCCCCC] rounded-[12px] pl-[25px] font-bold text-[14px] w-[590px] h-[48px]"
                placeholder="깃허브 주소를 입력하세요..."
              />
              <button
                onClick={(e) => handleClearInput("github_url", e)}
                className="absolute right-[15px] top-[10px] text-[#AAAAAA] text-[30px] hover:text-red-500"
              >
                <HiOutlineXMark />
              </button>
            </div>
          </div>
          <button type="submit" onClick={handleUpdateSocialLinks}>
            수정하기
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div className="flex relative items-center">
            <input
              type="url"
              name="newBlogUrl"
              value={newSocialLinks.newBlogUrl}
              onChange={handleAddInputChange}
              className="border border-[#CCCCCC] rounded-[12px] pl-[25px] font-bold text-[14px] w-[590px] h-[48px]"
              placeholder="새로운 블로그 주소를 입력하세요..."
            />
            <button
              onClick={(e) => handleClearInput("newBlogUrl", e)}
              className="absolute right-[15px] top-[10px] text-[#AAAAAA] text-[30px] hover:text-red-500"
            >
              <HiOutlineXMark />
            </button>
          </div>
          <div>
            <div className="flex relative items-center">
              <input
                type="url"
                name="newGithubUrl"
                value={newSocialLinks.newGithubUrl}
                onChange={handleAddInputChange}
                className="border border-[#CCCCCC] rounded-[12px] pl-[25px] font-bold text-[14px] w-[590px] h-[48px]"
                placeholder="새로운 깃허브 주소를 입력하세요..."
              />
              <button
                onClick={(e) => handleClearInput("newGithubUrl", e)}
                className="absolute right-[15px] top-[10px] text-[#AAAAAA] text-[30px] hover:text-red-500"
              >
                <HiOutlineXMark />
              </button>
            </div>
          </div>
          <button type="button" onClick={handleAddSocialLinks}>
            추가하기
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfileSocialForm
