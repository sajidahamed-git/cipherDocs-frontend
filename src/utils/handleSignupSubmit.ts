import bcrypt from "bcryptjs";
import PasswordValidator from "password-validator";
const API_URL =
  import.meta.env.VITE_API_URL || "https://cipherapi.sajidahamed.com";

// Create a password schema
const passwordSchema = new PasswordValidator();
passwordSchema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(20) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 1 digit
  .has()
  .symbols(1) // Must have at least 1 symbol
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Password123", "Password1!"]); // Blacklist these values

type ValidationError = {
  validation: string;
  arguments: number | string | boolean;
  message: string;
};

export default async function handleSignupSubmit(
  username: string,
  password: string,
  confirmPassword: string,
  e: React.FormEvent<HTMLFormElement>,
) {
  e.preventDefault();

  // Check if passwords match
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // Validate password strength

  const validationResult = passwordSchema.validate(password, {
    details: true,
  }) as ValidationError[];
    // If validation fails, show error messages
  if (validationResult.length > 0) {
    const errorMessages = validationResult.map((error) => {
      switch (error.validation) {
        case "min":
          return "Password must be at least 8 characters long";
        case "max":
          return "Password must be less than 100 characters";
        case "uppercase":
          return "Password must contain at least one uppercase letter";
        case "lowercase":
          return "Password must contain at least one lowercase letter";
        case "digits":
          return "Password must contain at least one number";
        case "symbols":
          return "Password must contain at least one special character";
        case "spaces":
          return "Password should not contain spaces";
        case "oneOf":
          return "Password is too common and easily guessed";
        default:
          return `Password validation failed: ${error.validation}`;
      }
    });
    alert(errorMessages.join("\n"));
    return;
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password: hashedPassword }),
      credentials: "include", // important for cookies/session
    });
    if (response.ok) {
      // Redirect or update UI on successful signup
      window.location.href = "/dashboard"; // change as needed
    } else {
      const data = await response.json();
      console.error(data.message || "Signup failed");
    }
  } catch (e) {
    console.error("Network errrrrrrrrror", e);
  }
}
