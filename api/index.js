import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase";

//! Create a customers collection
export const createCustomer = async (email, selectedPlan) => {
  try {
    // console.log(user,selectedPlan);
    const customerCollectionRef = collection(db, "Customers");
    const newCustomer = {
      email: email,
      plan: selectedPlan,
      createAt: serverTimestamp(),
    };
    await addDoc(customerCollectionRef, newCustomer);
    return newCustomer;
  } catch (error) {
    console.log(error.message);
  }
};

//!Fetch customers data
export const getCustomersData = async (userEmail) => {
   const customerCollectionRef = collection(db, "Customers");
   const queryToCheck = query(customerCollectionRef, where("email", "==", userEmail));
 
   try {
     const querySnapshot = await getDocs(queryToCheck);
     const customersData = [];
     
     querySnapshot.forEach((doc) => {
       // Accessing the fields of each document
       const customerData = doc.data();
       customersData.push(customerData);
     });
 
     return customersData;
   } catch (error) {
     console.log(error.message);
     return null;
   }
 };