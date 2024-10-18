import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/userType";

interface UserStore {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,

      login: (userData: User) =>
        set(() => ({
          user: userData,
        })),

      logout: () =>
        set(() => ({
          user: null,
        })),
    }),
    {
      name: "user-storage", // نام key که در localStorage ذخیره می‌شود
    }
  )
);
