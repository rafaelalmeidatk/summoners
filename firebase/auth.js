import { auth } from './firebase'

// Sign Up
export const createUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password)

// Login
export const login = (email, password) => auth.signInWithEmailAndPassword(email, password)

// Sign out
export const signOut = () => auth.signOut()
