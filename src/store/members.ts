import { ExtendedUsersType } from "@/types/extendedType"
import { Tables } from "@/types/supabase"
import { create } from "zustand"

interface TMembersState {
  selectedMember: ExtendedUsersType
  setSelectedMember: (user: ExtendedUsersType) => void
  viewMemberModal: boolean
  setViewMemberModal: (value: boolean) => void
  memberPosition: Tables<"positions"> | null
  setMemberPosition: (position: Tables<"positions"> | null) => void
}

const useMembersStore = create<TMembersState>()((set) => ({
  selectedMember: {} as ExtendedUsersType,
  setSelectedMember: (user: ExtendedUsersType) => set({ selectedMember: user }),
  viewMemberModal: false,
  setViewMemberModal: (value: boolean) => set({ viewMemberModal: value }),
  memberPosition: {} as Tables<"positions"> | null,
  setMemberPosition: (position: Tables<"positions"> | null) =>
    set({ memberPosition: position }),
}))

export default useMembersStore
