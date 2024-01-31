import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type TUrlState = {
  url: string
  setUrl: (url: string) => void
}

const useUrlStore = create<TUrlState>()(
  persist(
    (set) => ({
      url: "",
      setUrl: (url) => set({ url: url }),
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)

export default useUrlStore
