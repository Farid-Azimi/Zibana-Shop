import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  userId: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  setUser: (userId: string, email: string, firstName: string, lastName: string) => void;
  resetUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: null,
      firstName: null,
      lastName: null,
      email: null,
      setUser: (userId, email, firstName, lastName) =>
        set({ userId, email, firstName, lastName }),
      resetUser: () => set({ userId: null, firstName: null, lastName: null, email: null }),
    }),
    {
      name: "user-storage", 
    }
  )
);
