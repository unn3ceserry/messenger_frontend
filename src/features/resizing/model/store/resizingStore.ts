import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface IResizingState {
  width: number;
}

interface IResizingActions {
  setWidth: (width: number) => void;
}

interface IResizingStore extends IResizingState, IResizingActions {}

const initialState: IResizingState = {
  width: 0

};

export const useResizingStore = create<IResizingStore>()(
  immer(
    persist(
      (set) => ({
        ...initialState,
        setWidth: (width) => {
          set((state) => {
            state.width = width;
          });
        },
      }),
      {
        name: "sidebar-width",
        storage:
          typeof window !== "undefined"
            ? createJSONStorage(() => localStorage)
            : undefined,
      }
    )
  )
);
