import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IResizingState {
  width: number;
}

const initialState: IResizingState = {
  width: 480
};

export const useResizingSlice = createSlice({
  name: "resizing",
  initialState,
  selectors: {
    selectWidth: (state) => state.width,
  },
  reducers: {
    setWidth: (state, payload: PayloadAction<{width: number}>) => {
      state.width = payload.payload.width
    }
  }
})

export const useResizingReducer = useResizingSlice.reducer;
export const {setWidth} = useResizingSlice.actions