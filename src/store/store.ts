import { configureStore } from "@reduxjs/toolkit";
import deckIdSlice from "./slices/deckIdSlice";
import playersSlice from "./slices/playersSlice";
import userSlice from "./slices/userSlices";

const store = configureStore({
  reducer: {
    user: userSlice,
    deckId: deckIdSlice,
    players: playersSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
