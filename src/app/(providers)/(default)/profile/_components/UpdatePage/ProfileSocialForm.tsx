import { Dispatch, SetStateAction } from "react"
import { useQuery } from "@tanstack/react-query"
import { getSocialLinks } from "../../api"
import { Tables } from "@/types/supabase"
import { HiOutlineXMark } from "react-icons/hi2"

const ProfileSocialForm = ({
  userId,
  setUpdatedLinkData,
  newLinkData,
  setNewLinkData,
}: {
  userId: string
  setUpdatedLinkData: Dispatch<SetStateAction<Tables<"social_links">[]>>
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
    setUpdatedLinkData(updatedLinks)
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
    return <div>소셜주소 데이터를 불러오는 중 오류가 발생했습니다</div>
  }

  return (
    <form>
      <div className="pt-[20px]">
        {social_links?.map((link: Tables<"social_links">, index: number) => (
          <div key={link.id}>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <label
                  htmlFor={`blog_url_${index}`}
                  className="text-[20px] font-bold mb-2"
                >
                  Blog
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id={`blog_url_${index}`}
                    value={link.blog_url as string}
                    onChange={(e) =>
                      handleInputChange(index, "blog_url", e.target.value)
                    }
                    className="border border-[#CCCCCC] rounded-[12px] pl-[25px] font-bold text-[14px] w-[590px] h-[48px]"
                    placeholder="블로그 주소를 입력하세요..."
                  />
                  <button
                    type="button"
                    onClick={() => handleInputChange(index, "blog_url", "")}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-[#AAAAAA] text-[30px] hover:text-red-500"
                  >
                    <HiOutlineXMark />
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor={`github_url_${index}`}
                  className="flex text-[20px] font-bold h-[40px]"
                >
                  GitHub
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id={`github_url_${index}`}
                    value={link.github_url as string}
                    onChange={(e) =>
                      handleInputChange(index, "github_url", e.target.value)
                    }
                    className="border border-[#CCCCCC] rounded-[12px] pl-[25px] font-bold text-[14px] w-[590px] h-[48px]"
                    placeholder="깃허브 주소를 입력하세요..."
                  />
                  <button
                    type="button"
                    onClick={() => handleInputChange(index, "github_url", "")}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-[#AAAAAA] text-[30px] hover:text-red-500"
                  >
                    <HiOutlineXMark />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {social_links?.length === 0 && (
          <div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <label
                  htmlFor="new_blog_url"
                  className="text-[20px] font-bold mb-2"
                >
                  Blog
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="new_blog_url"
                    value={newLinkData[0]?.blog_url || ""}
                    onChange={(e) =>
                      handleNewLinkInputChange(
                        "blog_url",
                        e.target.value.trim(),
                      )
                    }
                    className="border border-[#CCCCCC] rounded-[12px] pl-[25px] font-bold text-[14px] w-[590px] h-[48px]"
                    placeholder="블로그 주소를 입력하세요..."
                  />
                  <button
                    type="button"
                    onClick={() => handleNewLinkInputChange("blog_url", "")}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-[#AAAAAA] text-[30px] hover:text-red-500"
                  >
                    <HiOutlineXMark />
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="new_github_url"
                  className="text-[20px] font-bold mb-2"
                >
                  GitHub
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="new_github_url"
                    value={newLinkData[0]?.github_url || ""}
                    onChange={(e) =>
                      handleNewLinkInputChange(
                        "github_url",
                        e.target.value.trim(),
                      )
                    }
                    className="border border-[#CCCCCC] rounded-[12px] pl-[25px] font-bold text-[14px] w-[590px] h-[48px]"
                    placeholder="깃허브 주소를 입력하세요..."
                  />
                  <button
                    type="button"
                    onClick={() => handleNewLinkInputChange("github_url", "")}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-[#AAAAAA] text-[30px] hover:text-red-500"
                  >
                    <HiOutlineXMark />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  )
}

export default ProfileSocialForm
