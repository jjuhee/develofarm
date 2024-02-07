import { supabaseForClient } from "@/supabase/supabase.client"

interface TSurfitArticles {
  description: string
  href: string
  imgSrc: string
  title: string
  now: string
}

export async function getSurfitCrawlingData() {
  const { data, error } = await supabaseForClient
    .from("column_crawling")
    .select("*")

  if (error) console.log("에러메세지", error)
  return data
}
