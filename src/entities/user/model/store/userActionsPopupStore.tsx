import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IUserActionsPopupState {
  isOpenAddAccount: boolean;
  isOpenMyProfile: boolean;
  isOpenUserSettings: boolean;
  isNightMode: boolean;
}

interface IUserActionsPopupActions {
  setIsOpenAddAccount: (isOpenAddAccount: boolean) => void;
  setIsOpenMyProfile: (isOpenMyProfile: boolean) => void;
  setIsOpenUserSettings: (isOpenUserSettings: boolean) => void;
  setIsNightMode: (isNightMode: boolean) => void;
}

interface IIUserActionsPopupStore
  extends IUserActionsPopupState,
    IUserActionsPopupActions {}

const initialState: IUserActionsPopupState = {
  isNightMode: false,
  isOpenAddAccount: false,
  isOpenMyProfile: false,
  isOpenUserSettings: false,
};

export const userActionsPopupStore = create<IIUserActionsPopupStore>()(
  immer((set) => ({
    ...initialState,

    setIsNightMode: (isNightMode) =>
      set((state) => {
        state.isNightMode = isNightMode;
      }),

    setIsOpenAddAccount: (isOpenAddAccount) =>
      set((state) => {
        state.isOpenAddAccount = isOpenAddAccount;
      }),

    setIsOpenMyProfile: (isOpenMyProfile) =>
      set((state) => {
        state.isOpenMyProfile = isOpenMyProfile;
      }),

    setIsOpenUserSettings: (isOpenUserSettings) =>
      set((state) => {
        state.isOpenUserSettings = isOpenUserSettings;
      }),
  }))
);

