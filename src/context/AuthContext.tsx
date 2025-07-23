import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type { User } from "../types/types";

const API_URL =
  import.meta.env.VITE_API_URL || "https://cipherapi.sajidahamed.com";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  encryptionKey: CryptoKey | null; // Add encryptionKey to the context type
  setEncryptionKey: (key: CryptoKey) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  encryptionKey: null,
  setEncryptionKey: () => {
    throw new Error("setEncryptionKey called outside AuthProvider");
  },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  //Init to avoid ts errors, this will be set later

  const [encryptionKey, setEncryptionKey] = useState<CryptoKey | null>(null);

  useEffect(() => {
    const publicRoutes = ["/login", "/signup", "/"];
    if (publicRoutes.includes(location.pathname)) {
      setLoading(false);
      return;
    }

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
    <AuthContext.Provider
      value={{ user, loading, encryptionKey, setEncryptionKey }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
