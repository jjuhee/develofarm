import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"
import React from "react"
import { getPositions, getUsers } from "./api"
import MembersComponent from "./_components/MemberComponent"

/** 프리패치 데이터 캐시하지 않음 */
export const revalidate = 0

const MembersPage = async () => {
  const queryClient = new QueryClient()

  /** 멤버 리스트 프리패치 */
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["users", "전체보기"],
    queryFn: () => getUsers({ pageParam: 0, positionId: "" }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if ((lastPage?.length as number) < 4) {
        return null
      }
      return allPages.length * 4
    },
    pages: 1,
  })

  await queryClient.prefetchQuery({
    queryKey: ["positions"],
    queryFn: getPositions,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MembersComponent />
    </HydrationBoundary>
  )
}

export default MembersPage
