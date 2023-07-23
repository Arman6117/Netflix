// Import the functions you need from the SDKs you need

import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBghym_K2LdkqrMkKpR-lVSQOGUn6IlpvE",
  authDomain: "netflix-7a672.firebaseapp.com",
  projectId: "netflix-7a672",
  storageBucket: "netflix-7a672.appspot.com",
  messagingSenderId: "878171446517",
  appId: "1:878171446517:web:a8b7509c6c47b5367279bc"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }