import { atom } from "jotai";

export const initialAppState = {
  leftDrawerOpened: false,
};

// const storage = typeof window !== "undefined" ? window.localStorage : null;

// export const leftDrawerOpenedAtom = atomWithStorage(
//   "leftDrawerOpened",
//   initialAppState.leftDrawerOpened,
//   { ...createJSONStorage(() => storage as Storage) },
//   {
//     getOnInit: true,
//   }
// );

export const leftDrawerOpenedAtom = atom(initialAppState.leftDrawerOpened);
