import { supabaseForClient } from "@/supabase/supabase.client"
import { Tables } from "@/types/supabase"

/* User*/
export async function getUser(profileId: string) {
  const { data: userData, error: userError } = await supabaseForClient
    .from("users")
    .select("*, positions(*), user_tech(*, techs(*))")
    .eq("id", profileId)
    .single()
  if (userError) console.log("error", userError)

  return userData || null
}

export async function updateUser(profileId: string, updatedUserData: any) {
  const { data, error } = await supabaseForClient
    .from("users")
    .update(updatedUserData)
    .eq("id", profileId)

  if (error) {
    console.log("error", error)
    return null
  }

  return data
}

/* User Resumes */
export async function getUserResumes(profileId: string) {
  const { data: userData, error: userError } = await supabaseForClient
    .from("users")
    .select("*, careers(*), education(*), academies(*), specs(*)")
    .eq("id", profileId)
    .single()
  if (userError) console.log("error", userError)

  return userData || null
}

/* Career */
export async function getCareers({ userId }: { userId: string }) {
  const { data, error } = await supabaseForClient
    .from("careers")
    .select("*")
    .eq("user_id", userId)

  if (error) console.log("error", error)

  return data
}

export async function updateCareers(userId: string, updatedCareerData: any) {
  const updateQuery = updatedCareerData.map(
    async (career: Tables<"careers">) => {
      const { error } = await supabaseForClient
        .from("careers")
        .update({ ...career })
        .eq("user_id", userId)
        .eq("id", career.id)
        .select("*")

      if (error) {
        console.error("Error adding career:", error)
        throw error
      }
    },
  )
}

export async function addCareer(
  userId: string,
  newCareerData: any,
): Promise<any | null> {
  const { error } = await supabaseForClient.from("careers").insert([
    {
      user_id: userId,
      ...newCareerData,
    },
  ])

  if (error) {
    console.error("Error adding career:", error)
    throw error
  }
}

export async function deleteCareers(userId: string, careerIds: string[]) {
  const { data, error } = await supabaseForClient
    .from("careers")
    .delete()
    .in("id", careerIds)
    .eq("user_id", userId)

  if (error) {
    console.error("Error deleting careers:", error)
    throw error
  }

  return data
}

/* Education */
export async function getEducation({ userId }: { userId: string }) {
  const { data, error } = await supabaseForClient
    .from("education")
    .select("*")
    .eq("user_id", userId)

  if (error) console.log("error", error)

  return data
}

export async function updateEducation(
  userId: string,
  updatedEducationData: any,
) {
  const updateQuery = updatedEducationData.map(
    async (education: Tables<"education">) => {
      const { error } = await supabaseForClient
        .from("education")
        .update({ ...education })
        .eq("user_id", userId)
        .eq("id", education.id)
        .select("*")

      if (error) {
        console.error("Error adding education:", error)
        throw error
      }
    },
  )
}

export async function addEducation(
  userId: string,
  newEducationData: any,
): Promise<any | null> {
  const { data, error } = await supabaseForClient.from("education").insert([
    {
      user_id: userId,
      ...newEducationData,
    },
  ])

  if (error) {
    console.error("Error deleting education:", error)
    throw error
  }

  return data
}

export async function deleteEducation(userId: string, educationIds: string[]) {
  const { data, error } = await supabaseForClient
    .from("education")
    .delete()
    .in("id", educationIds)
    .eq("user_id", userId)

  if (error) {
    console.error("Error deleting education:", error)
    return null
  }

  return data
}

/* Academy */
export async function getAcademy({ userId }: { userId: string }) {
  const { data, error } = await supabaseForClient
    .from("academies")
    .select("*")
    .eq("user_id", userId)

  if (error) console.log("error", error)

  return data
}

export async function updateAcademies(userId: string, updatedAcademyData: any) {
  const updateQuery = updatedAcademyData.map(
    async (academy: Tables<"academies">) => {
      const { error } = await supabaseForClient
        .from("academies")
        .update({ ...academy })
        .eq("user_id", userId)
        .eq("id", academy.id)
        .select("*")

      if (error) {
        console.error("Error adding academies:", error)
        throw error
      }
    },
  )
}

export async function addAcademy(
  userId: string,
  newAcademyData: any,
): Promise<any | null> {
  const { error } = await supabaseForClient.from("academies").insert([
    {
      user_id: userId,
      ...newAcademyData,
    },
  ])

  if (error) {
    console.error("Error adding academies:", error)
    throw error
  }
}

export async function deleteAcademies(userId: string, academyIds: string[]) {
  const { data, error } = await supabaseForClient
    .from("academies")
    .delete()
    .in("id", academyIds)
    .eq("user_id", userId)

  if (error) {
    console.error("Error deleting academies:", error)
    return null
  }

  return data
}

/* Spec */
export async function getSpecs({ userId }: { userId: string }) {
  const { data, error } = await supabaseForClient
    .from("specs")
    .select("*")
    .eq("user_id", userId)

  if (error) console.log("error", error)

  return data
}

export async function updateSpecs(userId: string, updatedSpecsData: any) {
  const updateQuery = updatedSpecsData.map(async (spec: Tables<"specs">) => {
    const { error } = await supabaseForClient
      .from("specs")
      .update({ ...spec })
      .eq("user_id", userId)
      .eq("id", spec.id)
      .select("*")

    if (error) {
      console.error("Error adding specs:", error)
      throw error
    }
  })
}

export async function addSpec(
  userId: string,
  newSpecData: any,
): Promise<any | null> {
  const { error } = await supabaseForClient.from("specs").insert([
    {
      user_id: userId,
      ...newSpecData,
    },
  ])

  if (error) {
    console.error("Error adding specs:", error)
    throw error
  }
}

export async function deleteSpecs(userId: string, specIds: string[]) {
  const { data, error } = await supabaseForClient
    .from("specs")
    .delete()
    .in("id", specIds)
    .eq("user_id", userId)

  if (error) {
    console.error("Error deleting specs:", error)
    return null
  }

  return data
}

/* SocialLink */
export async function getSocialLinks({ userId }: { userId: string }) {
  const { data, error } = await supabaseForClient
    .from("social_links")
    .select("*")
    .eq("user_id", userId)

  if (error) console.log("error", error)

  return data
}

export async function addSocialLinks(
  userId: string,
  newSocialLinksData: any,
): Promise<any | null> {
  const deleteResult = await supabaseForClient
    .from("social_links")
    .delete()
    .eq("user_id", userId)

  if (deleteResult.error) {
    console.error(deleteResult.error)
    return null
  }

  const { error } = await supabaseForClient.from("social_links").insert([
    {
      user_id: userId,
      ...newSocialLinksData,
    },
  ])
  if (error) {
    console.error("Error adding social_links:", error)
    throw error
  }
}

/* Project */
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

/* Bookmark */
export async function getProfileBookmarks({ userId }: { userId: string }) {
  const { data, error } = await supabaseForClient
    .from("bookmarks")
    .select("*, projects(*)")
    .eq("user_id", userId)

  if (error) console.log("error", error)

  return data
}

/* Positions */
export async function getPositions() {
  const { data, error } = await supabaseForClient.from("positions").select("*")

  if (error) console.log("error", error)

  return data
}

export async function getPositionTechs() {
  const { data, error } = await supabaseForClient
    .from("position_tech")
    .select("*,techs(*)")

  if (error) console.log("error", error)

  return data
}

/* User Tech */
export async function addUserTech(
  newUserTechData: any,
  userId: string,
): Promise<any | null> {
  const deleteResult = await supabaseForClient
    .from("user_tech")
    .delete()
    .eq("user_id", userId)

  if (deleteResult.error) {
    console.error("Error deleting existing user tech data:", deleteResult.error)
    return null
  }

  const { data, error } = await supabaseForClient
    .from("user_tech")
    .upsert(newUserTechData)

  if (error) {
    console.error("Error adding user tech data:", error)
    return null
  }

  return data
}
