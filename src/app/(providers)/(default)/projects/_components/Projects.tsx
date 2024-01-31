import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { getProjects } from "../api"
import ProjectsPage from "../page"

const initialOption = {
  isOffline: null,
  startDate: "",
  endDate: "",
  regionId: "",
  techs: [],
}

export default async function Page() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["projects", false, { option: initialOption }],
    queryFn: () =>
      getProjects({
        ...initialOption,
        recruitStatus: false,
      }),
  })

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* <Posts /> */}
      <ProjectsPage />
    </HydrationBoundary>
  )
}
