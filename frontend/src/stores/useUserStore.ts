import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  token: string | null;
  setUser: (
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    token: string
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
      token: null,
      setUser: (id, email, firstName, lastName, token) =>
        set({ id, email, firstName, lastName, token }),
      resetUser: () =>
        set({ id: null, firstName: null, lastName: null, email: null, token: null }),
    }),
    {
      name: "user-storage",
    }
  )
);
