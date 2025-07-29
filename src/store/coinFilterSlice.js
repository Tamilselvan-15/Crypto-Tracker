import { createSlice } from "@reduxjs/toolkit";

const coinFilterSlice = createSlice({
  name: "coinFilter",
  initialState: {
    selectedCoin: "bitcoin",
    selectedDays: 1,
  },
  reducers: {
    setSelectedCoin(state, action) {
      state.selectedCoin = action.payload;
    },
    setSelectedDays(state, action) {
      state.selectedDays = action.payload;
    },
  },
});

export const { setSelectedCoin, setSelectedDays } = coinFilterSlice.actions;
export default coinFilterSlice.reducer;
