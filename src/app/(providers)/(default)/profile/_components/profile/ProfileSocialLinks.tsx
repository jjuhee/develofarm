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
    return <div>소셜주소 데이터를 불러오는 중 오류가 발생했습니다</div>
  }

  return (
    <>
      {social_links?.map((link: any) => (
        <div
          key={link.id}
          className="flex justify-between items-center w-[800px]"
        >
          <div>
            <h2 className="flex text-lg font-semibold h-[40px]">Blog</h2>
            <p className="">
              <a href={link.blog_url} target="_blank" rel="noopener noreferrer">
                {link.blog_url}
              </a>
            </p>
          </div>
          <div>
            <h2 className="flex text-lg font-semibold h-[40px]">Github </h2>
            <p className="">
              <a
                href={link.github_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.github_url}
              </a>
            </p>
          </div>
        </div>
      ))}
    </>
  )
}

export default ProfileSocialLinks
