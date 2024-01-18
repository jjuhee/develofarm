import React from "react"
import { useQuery } from "@tanstack/react-query"
import { getSocialLinks } from "../../api"

const ProfileSocialLinks = ({ profileId }: { profileId: string }) => {
  const {
    data: social_links,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["social_links", profileId],
    queryFn: () => getSocialLinks({ userId: profileId }),
    enabled: !!profileId,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>소셜 데이터를 불러오는 중 오류가 발생했습니다</div>
  }

  const socialLink = social_links?.[0]

  return (
    <div className="flex justify-between items-center w-[800px]">
      <div>
        <h2 className="flex text-[20px] font-bold h-[40px]">Blog</h2>
        {socialLink?.blog_url ? (
          <p className="text-[14px] font-bold">
            <a
              href={`${socialLink.blog_url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {socialLink.blog_url}
            </a>
          </p>
        ) : (
          <p className="text-[14px] font-bold">블로그 주소가 없습니다</p>
        )}
      </div>

      <div>
        <h2 className="flex text-[20px] font-bold h-[40px]">Github</h2>
        {socialLink?.github_url ? (
          <p className="text-[14px] font-bold">
            <a
              href={`${socialLink.github_url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {socialLink.github_url}
            </a>
          </p>
        ) : (
          <p className="text-[14px] font-bold">GitHub 주소가 없습니다</p>
        )}
      </div>
    </div>
  )
}

export default ProfileSocialLinks
