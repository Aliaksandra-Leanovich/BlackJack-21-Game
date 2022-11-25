import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICard, IUserStore } from "../types";

const initialState: IUserStore = {
  isAuthorized: null,
  email: "",
  hand: [],
  points: 0,
  password: "",
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
    setUserPassword: (state, action) => {
      state.password = action.payload;
    },
    setBudget: (state, action) => {
      state.budget = action.payload;
    },

    unsetUser: (state) => {
      state.isAuthorized = null;
      state.email = "";
      state.password = "";
    },
  },
});
export const {
  setUserEmail,
  unsetUser,
  unsetUserHand,
  setBudget,
  setUserPoints,
  setUserPassword,
  setUserHand,
} = userSlice.actions;
export default userSlice.reducer;
