import { supabaseForClient } from "@/supabase/supabase.client"
import { TablesInsert } from "@/types/supabase"

/** 프로젝트 테이블을 추가하면서, 선택된 포지션과 기술 스택 조인 테이블도 추가해준다
 * 프로젝트 테이블이 생기면서 생성된 project_id 값을 조인테이블에 넣어준다.
 */
interface TParam {
  isEditMode: boolean
  project: TablesInsert<"projects">
  techs: TTechs[]
  positions: string[]
}
export async function setProject({
  isEditMode,
  project,
  techs,
  positions,
}: TParam) {
  const { data: projectData, error: projectError } = await supabaseForClient
    .from("projects")
    .upsert([project])
    .select()

  if (projectError) {
    console.log("error", projectError)
    throw projectError
  }

  /* insert 시 방금 생성된 project id 필요 */
  if (projectData && projectData.length > 0) {
    console.log("insertedProjectData", projectData)
    const projectId = projectData[0].id

    // edit 모드에서 프로젝트-테크 테이블 삭제
    if (isEditMode) {
      const { error: EditError } = await supabaseForClient
        .from("project_tech")
        .delete()
        .eq("project_id", projectId)
      console.log("프로젝트-테크 테이블 삭제 error", EditError)
    }
    /* 테크 데이터 넣기 */
    const { error: techError } = await supabaseForClient
      .from("project_tech")
      .upsert(techs.map(({ tech_id }) => ({ tech_id, project_id: projectId })))

    if (techError) {
      console.log("error", techError)
      throw techError
    }

    /* 포지션 데이터 넣기 (필요 없음: 삭제예정) */
    const { error: positionError } = await supabaseForClient
      .from("project_position")
      .upsert(
        positions.map((positionId) => ({
          position_id: positionId,
          project_id: projectId,
        })),
      )

    if (positionError) {
      console.log("error", positionError)
      throw positionError
    }
  }

  return projectData
}

export async function upadateProject({ project, techs, positions }: TParam) {
  const { data: projectData, error: projectError } = await supabaseForClient
    .from("projects")
    .upsert([project])
    .select()

  if (projectError) {
    console.log("error", projectError)
    throw projectError
  }

  if (projectData && projectData.length > 0) {
    console.log("insertedProjectData", projectData)
    const projectId = projectData[0].id

    /* 테크 데이터 넣기 */
    const { error: techError } = await supabaseForClient
      .from("project_tech")
      .upsert(techs.map(({ tech_id }) => ({ tech_id, project_id: projectId })))

    if (techError) {
      console.log("error", techError)
      throw techError
    }

    /* 포지션 데이터 넣기 (필요 없음: 삭제예정) */
    const { error: positionError } = await supabaseForClient
      .from("project_position")
      .upsert(
        positions.map((positionId) => ({
          position_id: positionId,
          project_id: projectId,
        })),
      )

    if (positionError) {
      console.log("error", positionError)
      throw positionError
    }
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
