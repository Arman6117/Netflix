import { create } from "zustand";


export const useStore = create((set)=>({
    modal:false,
    currentMovie:null,
    setModal: (modal) => set(() => ({ modal })),
    setCurrentMovie: (currentMovie) => set(() => ({ currentMovie })),
}))