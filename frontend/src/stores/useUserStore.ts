import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  setUser: (email: string, firstName: string, lastName: string) => void;
  resetUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      firstName: null,
      lastName: null,
      email: null,
      setUser: (email, firstName, lastName) =>
        set({ email, firstName, lastName }),
      resetUser: () => set({ firstName: null, lastName: null, email: null }),
    }),
    {
      name: "user-storage", 
      // partialize: (state) => ({
      //   email: state.email,
      //   firstName: state.firstName,
      //   lastName: state.lastName,
      // }),
    }
  )
);
