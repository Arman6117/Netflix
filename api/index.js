import {collection,addDoc,serverTimestamp} from 'firebase/firestore'
import { db } from '@/firebase'
export const createCustomer =async (email,selectedPlan) =>{
   try {
    // console.log(user,selectedPlan);
    const customerCollectionRef = collection(db,'Customers');
    const newCustomer = {
        
        email:email,
        plan:selectedPlan,
        createAt:serverTimestamp()
    }
    await addDoc(customerCollectionRef,newCustomer);
    return newCustomer;
   } catch (error) {
    console.log(error.message);
   }
}