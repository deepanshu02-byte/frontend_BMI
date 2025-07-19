export interface ILoggedUser {
  email: string;
  name: string;
  role: "admin" | "patient";
  mobileNumber: string;
  gender: string;
  token: string;
  userId: string;
}


export interface IRegisterUser {
  name: string;
  age: string;
  height: string;
  weight: string;
  email: string;
  gender: string;
  password: string;
  role: string;
}
