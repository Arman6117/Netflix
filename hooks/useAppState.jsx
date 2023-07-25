'use client'
import {useContext,createContext,useState} from 'react'

const AppStateContext  = createContext({modal:false,movie:null})

export const AppStateProvider = ({children}) => {
   const [modal,setModal] = useState(false);
   const [movie,setMovie] = useState(null);

   return (<AppStateContext.Provider value={{modal,movie,setModal,setMovie}}>{children}</AppStateContext.Provider>)
}

export default function useAppState() {
    return useContext(AppStateContext)
  }