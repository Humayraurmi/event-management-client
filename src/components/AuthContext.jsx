"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase.config.js"; 
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";

const AuthContext = createContext({
  user: null,
  loading: true,
  logout: async () => {},
  updateUserProfile: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); 
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);

    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const updateUserProfile = async (name, photoURL) => {
    if (!auth.currentUser) {
      throw new Error("No user logged in to update profile.");
    }
    
    await updateProfile(auth.currentUser, { displayName: name, photoURL });
    
    setUser({ ...auth.currentUser }); 
  };

  const value = {
    user,
    loading,
    logout,
    updateUserProfile,
  };

  if (loading) {
     return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};