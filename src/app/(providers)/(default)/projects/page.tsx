import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { getProjects } from "./api"
import ProjectsComponent from "./_components/ProjectsComponent"

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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectsComponent />
    </HydrationBoundary>
  )
}
