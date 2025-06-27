//create types for username and password
export type Username = string;
export type Password = string;

//create types for login form
export interface LoginForm {
  username: Username;
  password: Password;
}
