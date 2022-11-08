import { configureStore } from "@reduxjs/toolkit";
import cardsSlice from "./slices/cardsSlice";
import userSlice from "./slices/userSlices";

const store = configureStore({
  reducer: { cards: cardsSlice, user: userSlice },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
