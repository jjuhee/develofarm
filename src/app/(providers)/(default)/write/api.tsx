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

// const upsertProject = async (project) => {
//   const { data: projectData, error: projectError } = await supabaseForClient
//     .from("projects")
//     .upsert(project)
//     .select()

//   if (projectError) {
//     console.log("error", projectError)
//     throw projectError
//   }
// }

// TODO: supabase api들을 각각의 함수로 만들어 이해하기 쉽게 만들어봅시다.
export async function setProject({ isEditMode, project, techs, file }: TParam) {
  // await upsertProject(project)
  const { data: projectData, error: projectError } = await supabaseForClient
    .from("projects")
    .upsert(project)
    .select()

  if (projectError) {
    console.log("error", projectError)
    throw projectError
  }

  /* insert 시 방금 생성된 project id 필요 */
  if (projectData && projectData.length > 0) {
    console.log("insertedProjectData", projectData)
    const projectId = projectData[0].id

    /* edit 모드에서 프로젝트-테크 테이블 삭제 */
    if (isEditMode) {
      const { error: EditError } = await supabaseForClient
        .from("project_tech")
        .delete()
        .eq("project_id", projectId)
      if (EditError) console.log("프로젝트-테크 테이블 삭제 error", EditError)
    }
    /* 테크 데이터 넣기 */
    const { error: techError } = await supabaseForClient
      .from("project_tech")
      .upsert(techs.map(({ tech_id }) => ({ tech_id, project_id: projectId })))

    if (techError) {
      console.log("error", techError)
      throw techError
    }

    /** 이미지를 storage에 저장 */
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

      /** 프로젝트 DB에 이미지 url 저장 */
      const { error } = await supabaseForClient
        .from("projects")
        .update({ picture_url: imagePath })
        .eq("id", projectId)
    }

    return projectData
  }
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
