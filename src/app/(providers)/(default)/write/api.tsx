import { supabaseForClient } from "@/supabase/supabase.client"
import { TablesInsert } from "@/types/supabase"

/** 프로젝트 테이블을 추가하면서, 선택된 포지션과 기술 스택 조인 테이블도 추가해준다
 * 프로젝트 테이블이 생기면서 생성된 project_id 값을 조인테이블에 넣어준다.
 * insert로만 사용
 */
interface TParam {
  project: TablesInsert<"projects">
  techs: TTechs[]
  positions: TablesInsert<"project_position">[]
}
export async function addProject({ project, techs, positions }: TParam) {
  const { data: projectData, error: projectError } = await supabaseForClient
    .from("projects")
    .insert([project])
    .select()

  if (projectError) console.log("error", projectError)
  if (projectData && projectData.length > 0) {
    console.log("insertedProjectData", projectData)
    const projectId = projectData[0].id

    /* 테크 데이터 넣기 */
    const { error: techError } = await supabaseForClient
      .from("project_tech")
      .upsert(techs.map((tech) => ({ ...tech, project_id: projectId })))

    if (techError) console.log("error", techError)

    /* 포지션 데이터 넣기 */
    const { error: positionError } = await supabaseForClient
      .from("project_position")
      .upsert(
        positions.map((position) => ({ ...position, project_id: projectId })),
      )
    if (positionError) console.log("error", positionError)
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

/* many rows
const { data, error } = await supabase
  .from('project_tech')
  .insert([
    { some_column: 'someValue' },
    { some_column: 'otherValue' },
  ])
  .select()
  */
