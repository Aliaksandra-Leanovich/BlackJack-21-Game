import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICard, IUserStore } from "../types";
import { v4 as uuidv4 } from "uuid";

const initialState: IUserStore = {
  isAuthorized: localStorage.getItem("user"),
  email: "",
  hand: [],
  points: 0,
  id: uuidv4(),
  budget: 10000,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserEmail: (state, action) => {
      state.isAuthorized = localStorage.getItem("user");
      state.email = action.payload;
    },
    setUserHand: (state, { payload }: PayloadAction<ICard>) => {
      state.hand = [
        { ...payload },
        ...state.hand.filter((item) => item.code !== payload.code),
      ];
    },
    unsetUserHand: (state) => {
      state.hand = [];
    },
    setUserPoints: (state, action) => {
      state.points = action.payload;
    },
    setBudget: (state, action) => {
      state.budget = action.payload;
    },

    unsetUser: (state) => {
      state.isAuthorized = localStorage.removeItem("user");
      state.email = "";
    },
  },
});
export const {
  setUserEmail,
  unsetUser,
  unsetUserHand,
  setBudget,
  setUserPoints,
  setUserHand,
} = userSlice.actions;
export default userSlice.reducer;
