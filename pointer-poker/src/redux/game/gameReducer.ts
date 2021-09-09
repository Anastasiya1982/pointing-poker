import { createSlice } from '@reduxjs/toolkit';

export interface GameState {
  users: [];
  isScrumMasterAPlayer: boolean;
  changingCardInRoundEnd: boolean;
  isTimerNeeded: boolean;
  scoreType: string;
  startGame: boolean;
  timer: boolean;
  issue: string | number;
  cards: [];
}

const initialState: GameState = {
  users: [],
  isScrumMasterAPlayer: false,
  changingCardInRoundEnd: false,
  isTimerNeeded: false,
  scoreType: 'SP',
  startGame: false,
  timer: false,
  issue: '',
  cards: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.data;
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
      state.timer = action.payload;
    },
    setIssue: (state, action) => {
      state.issue = action.payload.value;
    },
    setCards: (state, action) => {
      state.cards = action.payload;
    },
  },
});

export const {
  setUsers,
  setIsScrumMasterAPlayer,
  setChangingCardInRoundEnd,
  setIsTimerNeeded,
  setScoreType,
  setStartGame,
  setTimer,
  setIssue,
  setCards,
} = gameSlice.actions;

export default gameSlice.reducer;
