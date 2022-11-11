import { configureStore } from "@reduxjs/toolkit";
import deckIdSlice from "./slices/deckIdSlice";
import userSlice from "./slices/userSlices";

const store = configureStore({
  reducer: { user: userSlice, deckId: deckIdSlice },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;