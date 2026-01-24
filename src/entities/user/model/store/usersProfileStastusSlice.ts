import { RootState } from "@/app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OtherUsersProfileType = {
  isOpen: boolean,
  username: string,
};

const initialState: OtherUsersProfileType = {
  isOpen: false,
  username: '',
}

export const usersProfileStastusSlice = createSlice({
  name: 'userOtherUsersProfile',
  initialState,
  reducers: {
    setIsOpenOtherUsersProfile: (state, actions: PayloadAction<{username: string, isOpen: boolean}>) => {
      state.isOpen = actions.payload.isOpen;
      state.username = actions.payload.username;
    },
    closeOtherProfile: (state) => {
      state.isOpen = false;
      state.username = ''
    }
  }
})

export const usersProfileStastusReducer = usersProfileStastusSlice.reducer;
export const {setIsOpenOtherUsersProfile, closeOtherProfile} = usersProfileStastusSlice.actions;
export const getOtherProfileStatus = (store: RootState) => ({
  status: store.usersProfileStastus.isOpen,
  username: store.usersProfileStastus.username
});