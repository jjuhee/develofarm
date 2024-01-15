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
