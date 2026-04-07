import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app";

interface IMyDataState {
  userData: { id: string | null; blockedUsers: Array<string> };
}

export const initialState: IMyDataState = {
  userData: { id: null, blockedUsers: [] },
};

export const myDataSlice = createSlice({
  name: "myData",
  initialState,
  reducers: {
    setMyData: (
      state,
      action: PayloadAction<{ id: string; blockedUsers: Array<string> }>,
    ) => {
      state.userData.id = action.payload.id;
      state.userData.blockedUsers = action.payload.blockedUsers;
    },
    clearMyData: (state) => {
      state.userData.id = null;
      state.userData.blockedUsers = [];
    },
  },
});

export const myDataReducer = myDataSlice.reducer;
export const { setMyData } = myDataSlice.actions;
export const getMyData = (state: RootState) => state.myData.userData;
