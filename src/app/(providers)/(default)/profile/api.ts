import { supabaseForClient } from "@/supabase/supabase.client"

export async function getUser(profileId: string) {
  const { data: userData, error: userError } = await supabaseForClient
    .from("users")
    .select("*, positions(*), user_tech(*, techs(*))")
    .eq("id", profileId)
    .single()
  if (userError) console.log("error", userError)

  return userData || null
}

export async function getCareers({ userId }: { userId: string }) {
  const { data, error } = await supabaseForClient
    .from("careers")
    .select("*")
    .eq("user_id", userId)

  if (error) console.log("error", error)

  return data
}

export async function getEducation({ userId }: { userId: string }) {
  const { data, error } = await supabaseForClient
    .from("education")
    .select("*")
    .eq("user_id", userId)

  if (error) console.log("error", error)

  return data
}

export async function getAcademy({ userId }: { userId: string }) {
  const { data, error } = await supabaseForClient
    .from("academies")
    .select("*")
    .eq("user_id", userId)

  if (error) console.log("error", error)

  return data
}

export async function getSpecs({ userId }: { userId: string }) {
  const { data, error } = await supabaseForClient
    .from("specs")
    .select("*")
    .eq("user_id", userId)

  if (error) console.log("error", error)

  return data
}

export async function getSocialLinks({ userId }: { userId: string }) {
  const { data, error } = await supabaseForClient
    .from("social_links")
    .select("*")
    .eq("user_id", userId)

  if (error) console.log("error", error)

  return data
}

export async function getProjectMembers({ userId }: { userId: string }) {
  const { data, error } = await supabaseForClient
    .from("project_members")
    .select("*, projects(*)")
    .eq("user_id", userId)

  if (error) console.log("error", error)

  return data
}

export async function getProjects({ userId }: { userId: string }) {
  const { data, error } = await supabaseForClient
    .from("projects")
    .select("*")
    .eq("user_id", userId)

  if (error) console.log("error", error)

  return data
}

export async function getProfileBookmarks({ userId }: { userId: string }) {
  const { data, error } = await supabaseForClient
    .from("bookmarks")
    .select("*, projects(*)")
    .eq("user_id", userId)

  if (error) console.log("error", error)

  return data
}

// export async function getTechsByUserId({ userId }: { userId: string }) {
//   const { data, error } = await supabaseForClient
//     .from("user_tech")
//     .select("*")
//     .eq("user_id", userId)

//   if (error) console.log("error", error)

//   return data
// }
