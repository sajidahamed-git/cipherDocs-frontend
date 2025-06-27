//import username types from types.ts
import type { Username, Password } from "../types/types";

export default function handleLoginSubmit(
  username: Username,
  Password: Password,
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();

  console.log(`Username: ${username}, Password: ${Password}`);
  console.log(e);

  return;
}
