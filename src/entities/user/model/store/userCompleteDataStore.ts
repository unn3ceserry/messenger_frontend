import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IUserCompleteDataState {
  data: {
    email?: string;
    birthday?: string;
    password?: string;
  };
};

interface IUserCompleteDataActions {
  setData: (
    data: string,
    field: keyof Required<UserCompleteDataStore["data"]>
  ) => void;
};

export type UserCompleteDataStore = IUserCompleteDataState & IUserCompleteDataActions & {};

const initialState: IUserCompleteDataState = {
  data: {
    email: undefined,
    birthday: undefined,
    password: undefined,
  },
};


export const useUserCompleteDataStore = create<UserCompleteDataStore>()(
  immer((set) => ({
    ...initialState,
    setData: (value, field) =>
      set((state) => {
        state.data[field] = value;
      }),
  }))
);

export const getUserData = () =>
  useUserCompleteDataStore((state) => state.data);
export const setUserCompleteData = (
  data: string,
  field: keyof Required<UserCompleteDataStore["data"]>
) => useUserCompleteDataStore((state) => state.setData(data, field));
