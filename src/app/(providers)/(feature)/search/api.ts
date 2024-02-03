import { supabaseForClient } from "@/supabase/supabase.client"

// 검색어와 일치하는 프로젝트 가져오기
export async function getSearchedProject(
  title: string | undefined,
  pageParam: number | undefined,
) {
  const { data: projectData, error: projectError } = await supabaseForClient
    .from("projects")
    .select(
      "*, user:users(id, user_nickname, avatar_url), region:project_regions(*)",
    )
    .ilike("title", `%${title}%`)
    .range(pageParam! * 3, (pageParam! + 1) * 3 - 1)

  console.log("디바운스가 완료가 되었나요?!!!!", projectData, pageParam)
  if (projectError) console.log("error", projectError)

  return projectData || null
}
