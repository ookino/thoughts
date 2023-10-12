import { create } from 'zustand'

export const useStore = create((set) => ({
  backTo: '/',
  updateLink: (link: string) => set((state: any) => ({ backTo: link }))
}))
