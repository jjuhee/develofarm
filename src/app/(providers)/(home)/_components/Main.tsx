"use client"

import { useEffect, useState } from "react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-coverflow"
import "swiper/css/effect-fade"
import { getBookmarksCountEachProject } from "../../(default)/projects/api"
import { useRouter } from "next/navigation"
import Mainbanner from "./Mainbanner"
import MostBookmarked from "./MostBookmarked"
import TypingNetbookImage from "./TypingNetbookImage"
import WatchingScreenImage from "./WatchingScreenImage"
interface TBookmarksCountEachProject {
  id: string
  title: string
  content: string
  picture_url: string
}
;[]

export default function Main({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [mostbookmarkedProjectsCounted, setMostbookmarkedProjectsCounted] =
    useState<TBookmarksCountEachProject[] | null>([])

  useEffect(() => {
    const getFetchProject = async () => {
      const mostBookmarkedCountProject = await getBookmarksCountEachProject()
      setMostbookmarkedProjectsCounted(mostBookmarkedCountProject)
    }
    getFetchProject()
  }, [])

  return (
    <>
      <Mainbanner />
      <MostBookmarked bookmarksCountProjects={mostbookmarkedProjectsCounted} />

      <TypingNetbookImage />
      {children}
      <WatchingScreenImage />
    </>
  )
}
