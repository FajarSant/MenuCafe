import { getApps, initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:  process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: "G-6MREX67T5T"
};

if (!getApps().length) (
    initializeApp(firebaseConfig)
)

export const firebaseAuth = getAuth()

export const singUp = async (email , password) => {
    await createUserWithEmailAndPassword( firebaseAuth, email, password)
}

export const singIn = async (email, password) => {
    await signInWithEmailAndPassword( firebaseAuth, email, password)
}

export const signOut = async (email, password) => {
    await signOut(firebaseAuth)
}