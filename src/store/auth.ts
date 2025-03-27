import { IUser } from "@/types";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

interface AuthState {
  token: string | null;
  user: IUser | null;
  setAuth: (token: string | null) => void;
  logout: () => void;
}

// Get the initial value from localStorage with a helper function
const getInitialAuthState = () => {
  const token = localStorage.getItem("token");
  if (!token) return { token: null, user: null };
  try {
    const user = jwtDecode<IUser>(token);
    return { token, user };
  } catch {
    localStorage.removeItem("token");
    return { token: null, user: null };
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  token: getInitialAuthState().token,
  user: getInitialAuthState().user,
  setAuth: (token) => {
    if (token) {
      set({ token, user: jwtDecode<IUser>(token) });
    } else {
      set({ token: null, user: null });
    }
  },
  logout: () => set({ token: null }),
}));
