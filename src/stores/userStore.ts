import { create } from "zustand";
import { User } from "@/types/user.interface";
import { persist } from "zustand/middleware";

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  isLoggedIn: () => boolean;
  isCaptain: () => boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      isLoggedIn: () => get().user !== null,
      isCaptain: () => get().user?.role === "CAPTAIN",
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
