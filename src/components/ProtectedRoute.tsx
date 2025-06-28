import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL =
  import.meta.env.VITE_API_URL || "https://cipherapi.sajidahamed.com";
export default function ProtectedRoute({children}: {children: React.ReactNode}) {

      const navigate = useNavigate();

  const [loading, setLoading] = useState(true);


      useEffect(() => {
        const checkAuth = async () => {
          try {
            const response = await fetch(`${API_URL}/me`, {
              method: "GET",
              credentials: "include",
            });
            if (!response.ok) {
              throw new Error("Not authenticated");
            }
            const data = await response.json();
            console.log("User data from dashboard", data);
         
          } catch (error) {
            console.error("Authentication check failed:", error);
            navigate("/login");
          } finally {
            setLoading(false);
          }
        };
        checkAuth();
        
        
      }, [navigate]);
        if (loading) return <p className="text-center mt-10">Checking session...</p>;
  return <>{children}</>;
}