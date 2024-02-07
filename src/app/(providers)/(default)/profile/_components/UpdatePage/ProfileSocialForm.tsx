import React, { Dispatch, SetStateAction } from "react"
import { useQuery } from "@tanstack/react-query"
import { getSocialLinks } from "../../api"
import { Tables } from "@/types/supabase"
import SocialLinkInput from "./UpdateInputs/SocialLinkInput"

const ProfileSocialForm = ({
  userId,
  newLinkData,
  setNewLinkData,
}: {
  userId: string
  newLinkData: any
  setNewLinkData: Dispatch<SetStateAction<Tables<"social_links">[]>>
}) => {
  const {
    data: social_links,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["social_links", userId],
    queryFn: () => getSocialLinks({ userId: userId }),
    enabled: !!userId,
  })

  const handleInputChange = (
    index: number,
    field: keyof Tables<"social_links">,
    value: string,
  ) => {
    const updatedLinks = [...(social_links as Tables<"social_links">[])]
    ;(updatedLinks[index][field] as string) = value as string
    setNewLinkData(updatedLinks)
  }

  const handleNewLinkInputChange = (field: string, value: string) => {
    setNewLinkData((prevData: any) => [
      {
        ...prevData[0],
        [field]: value,
      },
    ])
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>소셜 링크 데이터를 불러오는 중 오류가 발생했습니다</div>
  }

  return (
    <form>
      <div className="pt-[20px]">
        {social_links?.map((link: Tables<"social_links">, index: number) => (
          <div key={link.id}>
            <div className="flex justify-between items-center">
              <SocialLinkInput
                id={`blog_url_${index}`}
                label="Blog"
                value={link.blog_url as string}
                onChange={(value) =>
                  handleInputChange(index, "blog_url", value)
                }
              />

              <SocialLinkInput
                id={`github_url_${index}`}
                label="GitHub"
                value={link.github_url as string}
                onChange={(value) =>
                  handleInputChange(index, "github_url", value)
                }
              />
            </div>
          </div>
        ))}
        {social_links?.length === 0 && (
          <div>
            <div className="flex justify-between items-center">
              <SocialLinkInput
                id="new_blog_url"
                label="Blog"
                value={newLinkData[0]?.blog_url || ""}
                onChange={(value) =>
                  handleNewLinkInputChange("blog_url", value.trim())
                }
              />

              <SocialLinkInput
                id="new_github_url"
                label="GitHub"
                value={newLinkData[0]?.github_url || ""}
                onChange={(value) =>
                  handleNewLinkInputChange("github_url", value.trim())
                }
              />
            </div>
          </div>
        )}
      </div>
    </form>
  )
}

export default ProfileSocialForm
