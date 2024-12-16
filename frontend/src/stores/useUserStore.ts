import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  setUser: (
    id: string,
    email: string,
    firstName: string,
    lastName: string
  ) => void;
  resetUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      setUser: (id, email, firstName, lastName) =>
        set({ id, email, firstName, lastName }),
      resetUser: () =>
        set({ id: null, firstName: null, lastName: null, email: null }),
    }),
    {
      name: "user-storage",
    }
  )
);
