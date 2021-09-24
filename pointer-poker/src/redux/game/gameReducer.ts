import { createSlice } from '@reduxjs/toolkit';
import { setUser, UserState } from '../user/userReducer';

export interface GameState {
  users: Array<UserState>;
  isScrumMasterAPlayer: boolean;
  changingCardInRoundEnd: boolean;
  isTimerNeeded: boolean;
  scoreType: string;
  startGame: boolean;
  timeOfRound: number;
  cards: Array<{ id:number; value: number }>;
  selectedCard: { id: string; value: number } | null;
  scrumMaster: null | UserState;
}

const initialState: GameState = {
  users: [],
  isScrumMasterAPlayer: false,
  changingCardInRoundEnd: false,
  isTimerNeeded: false,
  scoreType: 'story point',
  startGame: false,
  timeOfRound: 1,
  cards: [
    { id: 1, value: 0 },
    { id: 2, value: 12 },
    { id: 3, value: 1 },
    { id: 4, value: 13 },
  ],
  selectedCard: null,
  scrumMaster: null,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.data;
    },
    setScrumMusterData: (state, action) => {
      state.scrumMaster = action.payload.data;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    },
    setIsScrumMasterAPlayer: (state, action) => {
      state.isScrumMasterAPlayer = action.payload;
    },
    setChangingCardInRoundEnd: (state, action) => {
      state.changingCardInRoundEnd = action.payload;
    },
    setIsTimerNeeded: (state, action) => {
      state.isTimerNeeded = action.payload;
    },
    setScoreType: (state, action) => {
      state.scoreType = action.payload.value;
    },
    setStartGame: (state, action) => {
      state.startGame = action.payload;
    },
    setTimer: (state, action) => {
      state.timeOfRound = action.payload.value;
    },
     setCards: (state, action) => {
      state.cards = action.payload;
    },
    setSelectedCard: (state, action) => {
      state.selectedCard = action.payload;
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(setUser, (state: any, action: any) => {
      state.users = [action.payload, ...state.users];
    });
  },
});

export const {
  setUsers,
  setIsScrumMasterAPlayer,
  setChangingCardInRoundEnd,
  setIsTimerNeeded,
  setScoreType,
  setScrumMusterData,
  setStartGame,
  setTimer,
  setCards,
  setSelectedCard,
} = gameSlice.actions;

export default gameSlice.reducer;
