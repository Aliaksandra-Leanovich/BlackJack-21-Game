import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deckApi } from "../../services/DeckServices";
import { IDeckIdState } from "../types";

export const fetchDeckId = createAsyncThunk("deckId/fetchDeckId", () => {
  const deckId = deckApi.getDeck();
  return deckId;
});

const initialState = {
  deckId: "",
  status: "idle",
} as IDeckIdState;

const deckIdSlice = createSlice({
  name: "deckId",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDeckId.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchDeckId.fulfilled, (state, action) => {
      state.status = "success";
      state.deckId = action.payload;
    });
    builder.addCase(fetchDeckId.rejected, (state) => {
      state.status = "error";
    });
  },
});
export default deckIdSlice.reducer;
