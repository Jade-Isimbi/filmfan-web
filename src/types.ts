export interface User {
    id: number;
    username: string;
    password: string;
  }
  
  export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
  }