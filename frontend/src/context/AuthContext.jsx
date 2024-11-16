import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const googleProvider = new GoogleAuthProvider();

//authProvider
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //register the current user
  const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  //login with google provider
  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  const logoutUser = async () => {
    return signOut(auth);
  };
  
  //manage user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      auth,
      (user) => {
        setCurrentUser(user);
        setIsLoading(false);
      },
      [],
    );
    return unsubscribe; // unsubscribe on unmount to prevent memory leaks
  });

  const value = {
    currentUser,
    registerUser,
    loginUser,
    signInWithGoogle,
    logoutUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
