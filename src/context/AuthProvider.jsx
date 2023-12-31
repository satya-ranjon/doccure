import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

import auth from "../firebase/firebaseConfig";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const registration = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logoutUser = () => {
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid);
      setUser(user?.providerData[0]);
      setLoading(false);
      const loggedUser = { email: user?.email };
      if (user?.email) {
        axios
          .post(`${import.meta.env.VITE_SERVER_URL}/jwt`, loggedUser)
          .then((res) => {
            if (res.data) {
              localStorage.setItem("access-token", res.data);
              setLoading(false);
            }
          });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        logoutUser,
        user,
        userId,
        loading,
        login,
        registration,
        updateUserProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
