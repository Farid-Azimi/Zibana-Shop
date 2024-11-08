// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { User } from "../types/userType";

// interface UserStore {
//   user: User | null;
//   login: (userData: User) => void;
//   logout: () => void;
// }

// export const useUserStore = create<UserStore>()(
//   persist(
//     (set) => ({
//       user: null,

//       login: (userData: User) =>
//         set(() => ({
//           user: userData,
//         })),

//       logout: () =>
//         set(() => ({
//           user: null,
//         })),
//     }),
//     {
//       name: "user-storage",
//     }
//   )
// );

import { create } from 'zustand';

type UserState = {
  userId: string | null;
  loggedIn: boolean;
  setUser: (userId: string) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  loggedIn: false,
  setUser: (userId: string) =>
    set({
      userId,
      loggedIn: true,
    }),
  clearUser: () =>
    set({
      userId: null,
      loggedIn: false,
    }),
}));