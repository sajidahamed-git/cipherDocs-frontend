//import username types from types.ts
import type { Username, Password } from "../types/types";
import bcrypt from "bcryptjs";
const API_URL =
  import.meta.env.VITE_API_URL || "https://cipherapi.sajidahamed.com";

export default async function handleLoginSubmit(
  username: Username,
  Password: Password,
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();
  
  // Hash the password for zero-trust architecture
  const hashedPassword = await bcrypt.hash(Password, 10);
  
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password: hashedPassword }), // Send hashed password
      credentials: "include", // important for cookies/session
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Show success message
      alert(data.message || "Login successful");
      console.log("Login successful:", data.user);
      
      // Redirect to dashboard after successful login
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } else {
      // Handle error response (401 or other errors)
      alert(data.error || data.message || "Login failed");
      console.error("Login error:", data);
    }
  } catch (e) {
    console.error("Network error:", e);
    alert("Network error. Please check your connection and try again.");
  }
}
