import {create} from 'zustand'

interface IStore {
  searchQuery: string
  setSearchQuery: (search:string) => void
}

export const useSearchStore = create<IStore>((set) => ({
  searchQuery: '',
  setSearchQuery: (search) => set({searchQuery:  search})
}))