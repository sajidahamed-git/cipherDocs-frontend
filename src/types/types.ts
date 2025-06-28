//create types for username and password
export type Username = string;
export type Password = string;

//create types for login form
export interface LoginForm {
  username: Username;
  password: Password;
}

// type for user object returned from authentication
export interface Document {
  id: number;
  title: string;
  content: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  userId: number;
}

export interface User {
  id: number;
  username: string;
  documents: Document[];
}
