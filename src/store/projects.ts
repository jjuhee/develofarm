import { create } from "zustand"

type TProjectsState = {
  page: number
  setPage: (page: number) => void
}

const useProjectsStore = create<TProjectsState>()((set) => ({
  page: 1,
  setPage: (page: number) => set({ page: page }),
}))

export default useProjectsStore
