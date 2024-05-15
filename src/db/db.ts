import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAoUkHfSEyEuJYiJKplQT48rtionfWsdnM",
  authDomain: "project-clincrm.firebaseapp.com",
  projectId: "project-clincrm",
})

export const db = getFirestore(firebaseApp)
