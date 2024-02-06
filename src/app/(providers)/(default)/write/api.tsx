import { supabaseForClient } from "@/supabase/supabase.client"
import { TablesInsert } from "@/types/supabase"

/** 프로젝트 테이블을 추가하면서, 선택된 기술 스택 조인 테이블도 추가해준다
 * 프로젝트 테이블이 생기면서 생성된 project_id 값을 조인테이블에 넣어준다.
 */
interface TParam {
  isEditMode: boolean
  project: TablesInsert<"projects">
  techs: TTechs[]
  file: File | null
}

const upsertProject = async (project: TablesInsert<"projects">) => {
  const { data: projectData, error } = await supabaseForClient
    .from("projects")
    .upsert(project)
    .select()

  if (error) {
    console.log("error", error)
    throw error
  }
  return projectData
}

const deleteProjectTech = async (projectId: string) => {
  const { error } = await supabaseForClient
    .from("project_tech")
    .delete()
    .eq("project_id", projectId)
  if (error) console.log("error", error)
}

const upsertProjectTech = async (projectId: string, techs: TTechs[]) => {
  const { error } = await supabaseForClient
    .from("project_tech")
    .upsert(techs.map(({ tech_id }) => ({ tech_id, project_id: projectId })))

  if (error) {
    console.log("error", error)
    throw error
  }
}

const uploadProjectImage = async (projectId: string, file: File | null) => {
  const BASE_URL = `https://aksbymviolrkiainilpq.supabase.co/storage/v1/object/public/project_image/`
  let imagePath = ""

  if (file) {
    const fileExt = file.name.split(".").pop()
    const fileName = `${Math.random()}.${fileExt}`
    const subUrl = `${projectId}/${fileName}`
    const { data: image, error: imageError } = await supabaseForClient.storage
      .from("project_image")
      .upload(`${subUrl}`, file)

    imagePath = BASE_URL + image?.path

    if (imageError) {
      console.log("이미지 저장 error", imageError)
      throw imageError
    }
  }
  return imagePath
}

const updateProjectImage = async (projectId: string, imagePath: string) => {
  const { error } = await supabaseForClient
    .from("projects")
    .update({ picture_url: imagePath })
    .eq("id", projectId)
  if (error) {
    console.log("error", error)
  }
}

export async function setProject({ isEditMode, project, techs, file }: TParam) {
  const projectData = await upsertProject(project)

  /* insert 시 방금 생성된 project id 필요 */
  if (projectData && projectData.length > 0) {
    const projectId = projectData[0].id

    /* edit 모드에서 프로젝트-테크 테이블 삭제 */
    if (isEditMode) {
      await deleteProjectTech(projectId)
    }
    /* 테크 데이터 넣기 */
    await upsertProjectTech(projectId, techs)

    /** 이미지를 storage에 저장 */
    const imagePath = await uploadProjectImage(projectId, file)

    /** 프로젝트 DB에 이미지 url 저장 */
    await updateProjectImage(projectId, imagePath)
  }

  return projectData
}

export async function setProjectPositionsAndTechs(
  techs: TablesInsert<"project_tech">[],
) {
  const { data, error } = await supabaseForClient
    .from("project_tech")
    .upsert(techs)
    .select()

  if (error) console.log("error", error)

  return data
}

export async function setProjectPositions(
  positions: TablesInsert<"project_position">[],
) {
  const { data, error } = await supabaseForClient
    .from("project_position")
    .upsert(positions)
    .select()

  if (error) console.log("error", error)

  return data
}
