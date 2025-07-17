import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "https://cipherapi.sajidahamed.com";


import type { User } from "../types/types"; // Adjust the import path as necessary
 // Adjust the import path as necessary
type AuthContextType = { user: User | null; loading: boolean };

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    console.log("use effect in the auth provider is running");
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/me`, { credentials: "include" });
        const data = res.ok ? await res.json() : null;
        setUser(data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);