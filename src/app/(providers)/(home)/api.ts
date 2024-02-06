import { supabaseForClient } from "@/supabase/supabase.client"

interface TSurfitArticles {
  description: string | null
  href: string | null
  imgSrc: string | null
  title: string | null
  now: string | null
}

export async function setSurfitCrawlingData({
  surfitArticles,
}: {
  surfitArticles: TSurfitArticles[]
}) {
  console.log("api에서 크롤링한 데이터 확인", surfitArticles)
  const { data, error } = await supabaseForClient
    .from("column_crawling")
    .insert(surfitArticles)

  if (error) console.log("에러는 무엇인가요", error)

  return
}
