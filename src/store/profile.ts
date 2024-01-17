import create from "zustand"

interface ProfileState {
  profile: any
  setProfile: (profile: any) => void
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}))
