import { supabaseForClient } from "@/supabase/supabase.client"

interface TSurfitArticles {
  description: string | null
  href: string | null
  imgSrc: string | null
  title: string | null
  now: string | null
}

export async function getSurfitCrawlingData() {
  const { data, error } = await supabaseForClient
    .from("column_crawling")
    .select("*")

  console.log("supbase 데이터!!!!!!!!!!!!", data)
  if (error) console.log("에러메세지", error)
  return data
}
