export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  email?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
}
