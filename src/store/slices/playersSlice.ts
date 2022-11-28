import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlayer, IPlayers } from "../types";
import { v4 as uuidv4 } from "uuid";

const initialState: IPlayers = {
  players: [
    { name: "first", id: uuidv4(), points: 20 },
    { name: "second", id: uuidv4(), points: 25 },
    { name: "third", id: uuidv4(), points: 18 },
    { name: "forth", id: uuidv4(), points: 22 },
  ],
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setPlayers: (state, { payload }: PayloadAction<IPlayer>) => {
      state.players = [
        { ...payload },
        ...state.players.filter((player) => player.id !== payload.id),
      ];
    },
  },
});
export const { setPlayers } = playersSlice.actions;
export default playersSlice.reducer;
