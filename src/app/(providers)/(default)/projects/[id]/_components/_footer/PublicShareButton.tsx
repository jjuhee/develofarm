"use client"
import React, { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useCustomModal } from "@/hooks/useCustomModal"
import { LuLink } from "react-icons/lu"
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
  // 클립보드에 복사할 텍스트
  const copyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`

  const { data: projectTeck, isLoading } = useQuery({
    queryKey: ["projectTeck", { projectId: project.id }],
    queryFn: () => getProjectTech(project.id),
  })

  /**
   *@ query 해당 게시물 id를 구분하고 삭제된 댓글 제외한 목록 조회
   TODO: 글 삭제시 새로고침시에 전체갯수 업데이트 */
  const { data, isLoading: commentsIsLoading } = useQuery({
    queryKey: ["comments", { projectId: project.id }],
    queryFn: () => getComments(project.id),
  })

  const comments = data?.filter((comment) => comment.del_yn === false)

  const tech = projectTeck?.map((tech) => tech)

  const copyClipBoardHandler = async () => {
    try {
      // 클립보드에 텍스트 복사
      await navigator.clipboard.writeText(copyUrl)

      openCustomModalHandler("주소가 클립보드에 복사되었습니다!", "alert")
    } catch (error) {
      console.error("클립보드 복사에 실패했습니다:", error)
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
          mobileWebUrl: "https://developers.kakao.com",
          webUrl: "https://developers.kakao.com",
        },
      },
      itemContent: {
        profileText: "Developfarm",
        profileImageUrl:
          "https://aksbymviolrkiainilpq.supabase.co/storage/v1/object/public/project_image/common/project_default.png",
        titleImageUrl:
          "https://aksbymviolrkiainilpq.supabase.co/storage/v1/object/public/project_image/common/project_default.png",
        titleImageText: "프로젝트를 게시물을 확인해보세요!",
      },
      social: {
        commentCount: comments?.length,
      },
      buttons: [
        {
          title: "웹으로 이동",
          link: {
            mobileWebUrl: copyUrl,
            webUrl: copyUrl,
          },
        },
      ],
    })
  }

  if (isLoading) return <div>is Loading</div>

  return (
    <section className="absolute ml-[900px] mb-[330px] w-[300px] h-[250px] p-5 border-2 rounded-lg">
      <h4 className="mb-5 pb-2 font-semibold text-lg">공유하기</h4>
      <article className="flex">
        <div className="flex flex-col justify-center items-center mr-4">
          <button
            className="border-2 w-20 h-20 rounded-full flex justify-center items-center mb-2"
            onClick={() => copyClipBoardHandler()}
          >
            <LuLink size={30} />
          </button>
          <span className="font-semibold">url 복사</span>
        </div>
        <div className="flex flex-col mr-4">
          <button
            id="kakaotalk-sharing-btn"
            className="rounded-full w-20 h-20"
            onClick={kakaoShareClickHandler}
          >
            <Image
              height={90}
              width={90}
              src="/icons/kakaotalkSharingButton.png"
              alt="카카오톡 공유 버튼"
              className="inline-block rounded-full mb-2"
            />
            <span className="font-semibold">카카오톡 공유</span>
          </button>
        </div>
      </article>
    </section>
  )
}

export default PublicShareButton
