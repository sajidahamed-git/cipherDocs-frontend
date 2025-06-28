//import username types from types.ts
import type { Username, Password } from "../types/types";
const API_URL =
  import.meta.env.VITE_API_URL || "https://cipherapi.sajidahamed.com";

export default async function handleLoginSubmit(
  username: Username,
  Password: Password,
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();
  
  // Hash the password for zero-trust architecture
  
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password: Password }), // Send hashed password
      credentials: "include", // important for cookies/session
    });
    
    const data = await response.json();
    if (!response.ok) {
      // Handle error response
      console.error("Login failed:", data);
      alert(data.message || "Login failed. Please try again.");
      return;
    }
    // Handle successful login
    if(response.ok) {
      // Redirect or update UI on successful login
      window.location.href = "/dashboard"; // change as needed
    }
    console.log("Login successful:", data);



    console.log(response.status);
    console.log("Login response:", data);
    console.log('response', response);
  } catch (e) {
    console.error("Network error:", e);
    alert("Network error. Please check your connection and try again.");
  }
}
