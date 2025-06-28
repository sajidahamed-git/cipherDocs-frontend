import { useAuth } from "../context/AuthContext";
import { useEffect} from "react";
import { useNavigate} from "react-router-dom";



interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return <>{children}</>;
}
