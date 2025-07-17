import { AuthProvider } from "@/context/AuthContext";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <AuthProvider>
        <Outlet />
    </AuthProvider>
  );
}