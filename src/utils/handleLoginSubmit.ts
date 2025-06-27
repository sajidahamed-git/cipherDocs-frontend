//import username types from types.ts
import type { Username, Password } from "../types/types";
import bcrypt from "bcryptjs";

export default async function handleLoginSubmit(
  username: Username,
  Password: Password,
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();
  const hashedpassword = await bcrypt.hash(Password, 10);
  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password: hashedpassword }),
      credentials: "include", // important for cookies/session
    });
    if (response.ok) {
      // Redirect or update UI on successful login
      window.location.href = "/dashboard"; // change as needed
    } else {
      const data = await response.json();
      console.error(data.message || "Login failed");
    }
  } catch (e) {
    console.error("Network error", e);
  }
  console.log("Login attempt with username:", username);
  console.log("Login attempt with password:", Password);
  console.log("hashedpassword:", hashedpassword);
}
