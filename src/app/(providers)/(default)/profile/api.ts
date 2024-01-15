import { supabaseForClient } from "@/supabase/supabase.client"

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
