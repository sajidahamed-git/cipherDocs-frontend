import React, { createContext, useContext, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "https://cipherapi.sajidahamed.com";


import type { User } from "../types/types"; // Adjust the import path as necessary
 // Adjust the import path as necessary
type AuthContextType = { user: User | null; loading: boolean };

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/me`, { credentials: "include" })
      .then(res => res.ok ? res.json() : null)
      .then(data => setUser(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);