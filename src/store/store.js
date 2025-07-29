import { configureStore } from "@reduxjs/toolkit";
import coinFilterReducer from "./coinFilterSlice";

const store = configureStore({
  reducer: {
    coinFilter: coinFilterReducer,
  },
});

export default store;
