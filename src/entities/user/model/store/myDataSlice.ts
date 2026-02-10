import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app";

interface IMyDataState {
  userData: { id: string | null };
}

export const initialState: IMyDataState = {
  userData: { id: null },
};

export const myDataSlice = createSlice({
  name: 'myData',
  initialState,
  reducers: {
    setMyData: (state, action: PayloadAction<{ id: string }>) => {
      state.userData.id = action.payload.id;
    },
    clearMyData: (state) => {
      state.userData.id = null;
    },
  },
});

export const myDataReducer = myDataSlice.reducer;
export const { setMyData } = myDataSlice.actions;
export const getMyData = (state: RootState) => state.myData.userData.id ?? '';
