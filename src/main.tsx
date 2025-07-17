import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AuthLayout from "./components/AuthLayout.tsx";
import LoginPage from "./pages/loginPage.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import EditorPage from "./pages/EditorPage.tsx";
import Temp from "./pages/Temp.tsx"; // Temporary page for testing
import ProtectedRoute from "./components/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [

     {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "/dashboard/:id",
    element: (
      <ProtectedRoute>
        <EditorPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "temp",
    element: <Temp />,
  }
    ],
  },

]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
);
