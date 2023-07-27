import { create } from "zustand";


export const useStore = create((set)=>({
    subscription:false,
    modal:false,
    currentMovie:null,
    setModal: (modal) => set(() => ({ modal })),
    setCurrentMovie: (currentMovie) => set(() => ({ currentMovie })),
    setSubscription: (subscription) => set(()=>({subscription}))
}))