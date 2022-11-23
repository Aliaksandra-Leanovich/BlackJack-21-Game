import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICard } from "../types";

interface IUserStore {
  isAuthorized: boolean;
  email: string | undefined;
  name?: string | undefined;
  // password: string | undefined;
  hand: ICard[] | [];
  points: number;
  budget: number;
}

const initialState: IUserStore = {
  isAuthorized: false, //change!
  email: undefined,
  name: undefined,
  hand: [],
  points: 0,
  // password: undefined,
  budget: 10000,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserEmail: (state, action) => {
      state.isAuthorized = true;
      state.email = action.payload;
    },
    setUserName: (state, action) => {
      state.name = action.payload;
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
    // setUserPassword: (state, action) => {
    //   state.password = action.payload;
    // },
    setBudget: (state, action) => {
      state.budget = action.payload;
    },

    unsetUser: (state) => {
      state.isAuthorized = false;
      state.email = undefined;
    },
  },
});
export const {
  setUserEmail,
  setUserName,
  unsetUser,
  unsetUserHand,
  setBudget,
  setUserPoints,
  setUserHand,
} = userSlice.actions;
export default userSlice.reducer;
