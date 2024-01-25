import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { getProjects } from "./api"

export default async function ProjectRoute({ ProjectList, pageProps }) {
  const queryClient = new QueryClient()

  // await queryClient.prefetchQuery({
  //   queryKey: ["projects"],
  //   queryFn: () => getProjects,
  // })

  // const dehydratedState = dehydrate(queryClient)

  // console.log("dehydratedState", dehydratedState)

  return (
    <HydrationBoundary state={pageProps.dehydratedState}>
      <ProjectList {...pageProps} />
    </HydrationBoundary>
  )
}
