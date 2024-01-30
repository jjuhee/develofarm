"use client"
import React from "react"
import { usePathname } from "next/navigation"
import { useCustomModal } from "@/hooks/useCustomModal"
import { LuLink } from "react-icons/lu"

const PublicShareButton = () => {
  const { openCustomModalHandler } = useCustomModal()
  const pathname = usePathname()

  const copyClipBoardHandler = async () => {
    try {
      // 클립보드에 복사할 텍스트
      const copyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`

      // 클립보드에 텍스트 복사
      await navigator.clipboard.writeText(copyUrl)

      openCustomModalHandler("주소가 클립보드에 복사되었습니다!", "alert")
    } catch (error) {
      console.error("클립보드 복사에 실패했습니다:", error)
    }
  }

  const kakaoShareClickHandler = () => {
    // alert("테스트!")
    // Kakao.Share.createDefaultButton({
    //   container: "#kakaotalk-sharing-btn",
    //   objectType: "feed",
    //   content: {
    //     title: "오늘의 디저트",
    //     description: "아메리카노, 빵, 케익",
    //     imageUrl:
    //       "https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",
    //     link: {
    //       mobileWebUrl: "https://developers.kakao.com",
    //       webUrl: "https://developers.kakao.com",
    //     },
    //   },
    //   itemContent: {
    //     profileText: "Kakao",
    //     profileImageUrl:
    //       "https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
    //     titleImageUrl:
    //       "https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
    //     titleImageText: "Cheese cake",
    //     titleImageCategory: "Cake",
    //     items: [
    //       {
    //         item: "Cake1",
    //         itemOp: "1000원",
    //       },
    //       {
    //         item: "Cake2",
    //         itemOp: "2000원",
    //       },
    //       {
    //         item: "Cake3",
    //         itemOp: "3000원",
    //       },
    //       {
    //         item: "Cake4",
    //         itemOp: "4000원",
    //       },
    //       {
    //         item: "Cake5",
    //         itemOp: "5000원",
    //       },
    //     ],
    //     sum: "Total",
    //     sumOp: "15000원",
    //   },
    //   social: {
    //     likeCount: 10,
    //     commentCount: 20,
    //     sharedCount: 30,
    //   },
    //   buttons: [
    //     {
    //       title: "웹으로 이동",
    //       link: {
    //         mobileWebUrl: "https://developers.kakao.com",
    //         webUrl: "https://developers.kakao.com",
    //       },
    //     },
    //     {
    //       title: "앱으로 이동",
    //       link: {
    //         mobileWebUrl: "https://developers.kakao.com",
    //         webUrl: "https://developers.kakao.com",
    //       },
    //     },
    //   ],
    // })
  }

  return (
    <div className="absolute ml-[900px] mb-[330px] w-[200px] h-[250px] p-5 border-2 rounded-lg">
      <h4 className="mb-5 pb-2 font-semibold text-lg">공유하기</h4>
      <div className="flex flex-col justify-center items-center">
        <button
          className="border-2 w-20 h-20 rounded-full flex justify-center items-center mb-2"
          onClick={() => copyClipBoardHandler()}
        >
          <LuLink size={30} />
        </button>
        <span className="font-semibold">url 복사</span>
      </div>
      <div>
        <button onClick={kakaoShareClickHandler}>카카오톡 복사</button>
      </div>
    </div>
  )
}

export default PublicShareButton
