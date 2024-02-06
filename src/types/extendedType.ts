import {
  getProjectByUserId,
  getUsers,
} from "@/app/(providers)/(default)/members/api"
import {
  getProject,
  getProjects,
} from "@/app/(providers)/(default)/projects/api"
import { Tables } from "./supabase"
import {
  getComments,
  getMembers,
} from "@/app/(providers)/(default)/projects/[id]/api"

export type ExtendedProjectsType = Tables<"projects"> & {
  project_tech: ExtendedProjectTechType[]
}

export type ExtendedProjectTechType = Tables<"project_tech"> & {
  techs: Tables<"techs">
}

export type ExtendedUsersType = Tables<"users"> & {
  position: Tables<"positions">
  user_tech: ExtendedUserTechType[]
  social_link: Tables<"social_links">
}

export type ExtendedUserTechType = Tables<"user_tech"> & {
  techs: Tables<"techs">
}

export type TUsersType = Exclude<
  Awaited<ReturnType<typeof getUsers>>,
  void
>[number]

export type TProjectMembersType = Exclude<
  Awaited<ReturnType<typeof getMembers>>,
  null
>

export type TProjectMemberType = Exclude<
  Awaited<ReturnType<typeof getMembers>>,
  null
>[number]

export type TProjectsType = Exclude<
  Awaited<ReturnType<typeof getProjects>>,
  void
>[number]

export type TProjectType = Exclude<Awaited<ReturnType<typeof getProject>>, null>

export type TProjectsByUserId = Exclude<
  Awaited<ReturnType<typeof getProjectByUserId>>,
  void
>[number]

export type TCommentsType = Exclude<
  Awaited<ReturnType<typeof getComments>>,
  null
>[number]

export type TReCommentsType = Exclude<
  Awaited<ReturnType<typeof getComments>>,
  null
>[number]["comments"]
