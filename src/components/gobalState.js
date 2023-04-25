import { atom, selector } from "recoil";

export const darkModeState = atom({
  key: "darkModeState",
  default: false,
});
export const toggleDarkModeState = selector({
  key: "darkModeToggle",
  get: ({ get }) => {
    const currentValue = get(darkModeState);
    return currentValue;
  },
  set: ({ get, set }) => {
    const currentValue = get(darkModeState);
    set(darkModeState, !currentValue);
  },
});
