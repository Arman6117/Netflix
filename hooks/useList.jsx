import { db } from "@/firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";

function useList (email) {
    const [list,setList] = useState([]);
    useEffect(()=>{
     if(!email) return
      return onSnapshot(collection(db,'Customers',email,'myList'),(snapshot)=>{
        setList(snapshot.docs.map((doc)=>({
            id:doc.id,
            ...doc.data()
        })))
      })
    },[db,email])

    return list
}
export default useList