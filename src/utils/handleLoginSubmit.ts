//import username types from types.ts
// import { deriveEncryptionKey, getSaltForUser } from "../utils/crypto/crypto";
import type { Username, Password } from "../types/types";
const API_URL =
  import.meta.env.VITE_API_URL || "https://cipherapi.sajidahamed.com";

export default async function handleLoginSubmit(

  username: Username,
  Password: Password,
  e: React.FormEvent<HTMLFormElement>,
) {
  e.preventDefault();

  console.log("handleLoginSubmit called with:", username, Password);
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
      alert(data.message || "Login failed. Please try again.");
      return;
    }
    // Handle successful login
    if (response.ok) {
      // Redirect or update UI on successful login
      console.log("login successful");
      window.location.href = "/dashboard"; // change as needed
      // const salt = getSaltForUser(username);
      // const encryptionKey = await deriveEncryptionKey(Password, salt);
      // console.log("Encryption key derived:", encryptionKey);
    }
  } catch (e) {
    console.error("Network error:", e);
    alert("Network error. Please check your connection and try again.");
  }
}
