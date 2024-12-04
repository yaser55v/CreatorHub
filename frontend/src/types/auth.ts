// First, keep your existing interfaces
export interface User {
  id: string;
  email: string;
  name: string;
  accountType: 'creator' | 'business';
  verified: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  accountType: 'creator' | 'business';
}

// Add a new interface for the auth context
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  token: string | null;
  login: (credentials: LoginCredentials, remember: boolean) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  isAuthenticated: boolean;
}
