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
  id: string | null
  title: string | null
  content: string | null
  picture_url: string | null
}
;[]

export default function Main({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [bookmarksCountProjects, setBookmarksCountProjects] = useState<
    TBookmarksCountEachProject[] | null
  >([])

  useEffect(() => {
    const getFetchProject = async () => {
      const bookmarksCountEachProject = await getBookmarksCountEachProject()
      setBookmarksCountProjects(bookmarksCountEachProject)
      console.log("북마크 gorup화 한 project", bookmarksCountEachProject)
    }
    getFetchProject()
  }, [])

  const onDetailProjectsHandler = (projectId: string) => {
    router.push(`../../projects/${projectId}/`)
  }
  const bannerArray = [{ number: 1 }, { number: 2 }]
  return (
    <>
      <Mainbanner />
      <MostBookmarked
        bookmarksCountProjects={bookmarksCountProjects}
        onDetailProjectsHandler={onDetailProjectsHandler}
      />

      <TypingNetbookImage />
      {children}
      <WatchingScreenImage />
    </>
  )
}
