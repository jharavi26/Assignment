import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,} from "firebase/auth";

  import { auth } from "../Firebase/Firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // State to hold error messages

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message); // Handle error
    }
  };

  const signup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message); // Handle error
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message); // Handle error
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      setError(err.message); // Handle error
    }
  };

  const loginWithFacebook = async () => {
    try {
      await signInWithPopup(auth, new FacebookAuthProvider());
    } catch (err) {
      setError(err.message); // Handle error
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, loginWithGoogle, loginWithFacebook, error }}
    >
      {loading ? <div>Loading...</div> : children} {/* Show loading state */}
    </AuthContext.Provider>
  );
}
