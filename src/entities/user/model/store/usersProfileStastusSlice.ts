import { RootState } from "@/app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OtherUsersProfileType = {
  isOpen: boolean
};

const initialState: OtherUsersProfileType = {
  isOpen: false
}

export const usersProfileStastusSlice = createSlice({
  name: 'userOtherUsersProfile',
  initialState,
  reducers: {
    setIsOpenOtherUsersProfile: (state, actions: PayloadAction<boolean>) => {
      state.isOpen = actions.payload
    }
  }
})

export const usersProfileStastusReducer = usersProfileStastusSlice.reducer;
export const {setIsOpenOtherUsersProfile} = usersProfileStastusSlice.actions;
export const getOtherProfileStatus = (store: RootState) => store.usersProfileStastus.isOpen;