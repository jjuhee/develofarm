"use client"
import React from "react"
import { usePathname } from "next/navigation"
import { useCustomModal } from "@/hooks/useCustomModal"
import { getProject, getProjectTech } from "../../../api"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { getComments } from "../../api"

type Props = {
  project: Exclude<Awaited<ReturnType<typeof getProject>>, null>
}

const PublicShareButton = ({ project }: Props) => {
  const { openCustomModalHandler } = useCustomModal()
  const pathname = usePathname()
  const { Kakao } = window
  const copyUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`

  const { data: projectTeck, isLoading: projectTeckIsLoading } = useQuery({
    queryKey: ["projectTeck", { projectId: project.id }],
    queryFn: () => getProjectTech(project.id),
  })

  const { data, isLoading: commentsIsLoading } = useQuery({
    queryKey: ["comments", { projectId: project.id }],
    queryFn: () => getComments(project.id),
  })

  const comments = data?.filter((comment) => comment.del_yn === false)
  const tech = projectTeck?.map((tech) => tech)

  const copyClipBoardHandler = async () => {
    try {
      await navigator.clipboard.writeText(copyUrl)

      openCustomModalHandler("주소가 클립보드에 복사되었습니다!", "alert")
    } catch (error) {
      openCustomModalHandler(`클립보드 복사에 실패했습니다: ${error}`, "alert")
    }
  }

  const kakaoShareClickHandler = () => {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `${project.title}`,
        description: `${tech}`,
        imageUrl:
          "https://aksbymviolrkiainilpq.supabase.co/storage/v1/object/public/project_image/common/project_default.png",
        link: {
          mobileWebUrl: copyUrl,
          webUrl: copyUrl,
        },
      },
      itemContent: {
        profileText: "Developfarm",
        profileImageUrl:
          "https://aksbymviolrkiainilpq.supabase.co/storage/v1/object/public/project_image/common/developfarm-logo-no-title.png",
      },
      social: {
        commentCount: comments?.length,
      },
      buttons: [
        {
          title: "게시물 보러 가기",
          link: {
            mobileWebUrl: copyUrl,
            webUrl: copyUrl,
          },
        },
      ],
    })
  }

  if (projectTeckIsLoading)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Image src={"/images/load.gif"} alt="load" width={200} height={200} />
      </div>
    )

  if (commentsIsLoading)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Image src={"/images/load.gif"} alt="load" width={200} height={200} />
      </div>
    )

  return (
    <section className="absolute ml-[90px] mt-[200px] lg:ml-[900px] lg:mt-[210px] w-[300px] h-[164px] p-5 rounded-3xl shadow-md bg-[#fff]">
      <article className="flex flex-col justify-center items-center mb-5 mt-5">
        <article className="flex flex-row mr-4">
          <button
            id="kakaotalk-sharing-btn"
            className="rounded-full w-20 h-20"
            onClick={() =>
              openCustomModalHandler("업데이트 예정입니다!", "alert")
            }
          >
            <Image
              height={50}
              width={50}
              src="/icons/instargramSharingButton.png"
              alt="인스타그램 공유 버튼"
              className="inline-block mb-2 ml-2"
            />
            <span className="ml-2 font-semibold">인스타그램</span>
          </button>
          <button
            id="kakaotalk-sharing-btn"
            className="rounded-full w-20 h-20"
            onClick={kakaoShareClickHandler}
          >
            <Image
              height={50}
              width={50}
              src="/icons/kakaotalkSharingButton.png"
              alt="카카오톡 공유 버튼"
              className="inline-block mb-2 ml-2"
            />
            <span className="ml-2 font-semibold">카카오톡</span>
          </button>
          <button
            id="kakaotalk-sharing-btn"
            className="rounded-full w-20 h-20"
            onClick={() =>
              openCustomModalHandler("업데이트 예정입니다!", "alert")
            }
          >
            <Image
              height={50}
              width={50}
              src="/icons/naverSharingButton.png"
              alt="카카오톡 공유 버튼"
              className="inline-block mb-2 ml-2"
            />
            <span className="ml-2 font-semibold">네이버</span>
          </button>
        </article>
        <article className="flex flex-row justify-end items-end mr-4 mt-[16px]">
          <input
            value={copyUrl}
            className="w-[181px] h-[24px] border border-[#D2D2D2] rounded-md text-[#A6A6A6] p-[12px] mr-[10px]"
            readOnly
          />
          <button
            className="font-semibold w-[61px] h-[24px] bg-main-lime rounded-md text-black hover:bg-[#636366] hover:text-main-lime transition-all duration-300"
            onClick={() => copyClipBoardHandler()}
          >
            복사
          </button>
        </article>
      </article>
    </section>
  )
}

export default PublicShareButton
