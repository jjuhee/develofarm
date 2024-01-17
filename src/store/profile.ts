import create from "zustand"

interface ProfileState {
  id: string
  setId: (id: string) => void
}

export const useProfileStore = create<ProfileState>((set) => ({
  id: "",
  setId: (id) => set({ id }),
}))
