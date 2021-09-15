import { createSlice } from '@reduxjs/toolkit';
import users from '../../usersStore';

export interface GameState {
  users: Array<any>;
  isScrumMasterAPlayer: boolean;
  changingCardInRoundEnd: boolean;
  isTimerNeeded: boolean;
  scoreType: string;
  startGame: boolean;
  timeOfRound: number;
  issue: string | number;
  cards: [];
}

const initialState: GameState = {
  users,
  isScrumMasterAPlayer: false,
  changingCardInRoundEnd: false,
  isTimerNeeded: false,
  scoreType: 'SP',
  startGame: false,
  timeOfRound: 1,
  issue: '',
  cards: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users =  [action.payload.data,...state.users];
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
