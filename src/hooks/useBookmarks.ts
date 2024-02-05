import { getBookmarksByUserId } from "@/app/(providers)/(default)/projects/api"
import { Tables } from "@/types/supabase"
import { useQuery } from "@tanstack/react-query"

const useBookmarks = (currentUserId: string) => {
  const queryKey = ["bookmarks", currentUserId]

  const { data: bookmarks } = useQuery<Tables<"bookmarks">[]>({
    queryKey,
    queryFn: () => getBookmarksByUserId(currentUserId),
    enabled: !!currentUserId,
  })

  return bookmarks
}

export default useBookmarks
