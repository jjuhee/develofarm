import { Tables } from "@/types/supabase"
import { create } from "zustand"

interface TMembersState {
  member: Tables<"users">
  selectMember: (user: Tables<"users">) => void
  ViewMemberModal: boolean
  setViewMemberModal: (value: boolean) => void
}

const useMembersStore = create<TMembersState>()((set) => ({
  member: {} as Tables<"users">,
  selectMember: (user: Tables<"users">) => set({ member: user }),
  ViewMemberModal: false,
  setViewMemberModal: (value: boolean) => set({ ViewMemberModal: value }),
}))

export default useMembersStore
