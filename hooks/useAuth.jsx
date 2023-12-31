'use client'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useState, useMemo, useEffect, useContext, createContext } from "react";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

export const AuthContext = createContext({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [initialLoading, setInitialLoading] = useState(false);

  //! Persisting the user
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          //* Logged in...
          setUser(user);
          setLoading(false);
        } else {
          //* Not logged in...
          setUser(null);
          setLoading(true);
          router.push("/login");
        }

        setInitialLoading(false);
      }),
    [auth]
  );
  const signUp = async (email, password) => {
    try {
      setLoading(true);
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredentials.user);
      router.push("/plans");
      setLoading(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredentials.user);
      router.push("/");
      setLoading(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));
  };

  const memoValues = useMemo(() => {
   return {user, signUp, signIn, error, logout, loading, logout}
  }, [user, loading]);
  return (
    <AuthContext.Provider value={memoValues}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
