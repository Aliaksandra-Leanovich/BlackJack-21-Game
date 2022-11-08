import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cardsApi } from "../../services/CardsServices";
import { ICard, UsersState } from "../types";

export const fetchCards = createAsyncThunk<ICard[]>("cards/fetchCards", () => {
  const newCards = cardsApi.getDeck();
  return newCards;
});

const initialState = {
  cards: [],
  status: "idle",
} as UsersState;

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCards.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      state.status = "success";
      state.cards = action.payload;
    });
    builder.addCase(fetchCards.rejected, (state) => {
      state.status = "error";
    });
  },
});
export default cardsSlice.reducer;
