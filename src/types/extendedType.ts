import {
  getProjectByUserId,
  getUsers,
} from "@/app/(providers)/(default)/members/api"
import { getProjects } from "@/app/(providers)/(default)/projects/api"
import { Tables } from "./supabase"

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

export type TProjectsType = Exclude<
  Awaited<ReturnType<typeof getProjects>>,
  void
>[number]

export type TProjectsByUserId = Exclude<
  Awaited<ReturnType<typeof getProjectByUserId>>,
  void
>[number]
