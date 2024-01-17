declare interface TProjects {
  content: string
  created_at: string | null
  id: string
  is_offline: boolean
  number_of_people: number
  picture_url: string | null
  project_end_date: string
  project_start_date: string
  recruit_status: boolean | null
  region_id: string | null
  title: string
  updated_at: string | null
  user_id: string | null
  users?: string[] | null
  project_regions?: string[] | null
}

declare interface TCategoryData {
  startDate: string
  endDate: string
  isOffline: boolean | null
  region: string
  numberOfMembers: number
  positions: TPositions[]
  techs: TTechs[]
}

declare interface TProjectsOptions {
  orderBy?: string
  order?: number
  limit?: number
  offset?: number
  recruitStatus?: boolean
  isOffline?: boolean | null
  startDate?: string
  endDate?: string
  numberOfPeople?: number
  regionId?: string
  techs?: TTechs[]
}

declare interface TPositions {
  position_id: string
}

declare interface TTechs {
  tech_id: string
  position_id: string
}
