import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minutes",
  default: 0,
});

export const hoursSelector = selector<number>({
  key: "hours",
  // 첫 번째 인자
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
  // 두 번째 인자
  set: ({ set }, newValue) => {
    const minutes = Number(newValue) * 60;
    set(minuteState, minutes);
  },
});
