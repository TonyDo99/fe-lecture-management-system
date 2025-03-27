import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthState {
  token: string | null;
  user: IUser | null;
  setAuth: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setAuth: (token) => {
    if (token) {
      set({ token, user: jwtDecode<IUser>(token) });
    } else {
      set({ token: null, user: null });
    }
  },
  logout: () => set({ token: null }),
}));
