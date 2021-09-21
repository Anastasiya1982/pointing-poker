import { createSlice } from '@reduxjs/toolkit';
import { setUser, UserState } from '../user/userReducer';

export interface IssueType {
  title: string;
  priority?: string;
}

export interface GameState {
  users: Array<UserState>;
  isScrumMasterAPlayer: boolean;
  changingCardInRoundEnd: boolean;
  isTimerNeeded: boolean;
  scoreType: string;
  startGame: boolean;
  timeOfRound: number;
  issue: IssueType | null;
  issues: Array<IssueType>;
  cards: [];
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
  issue: {
    title: '',
    priority: '',
  },
  issues: [],
  cards: [],
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

    setIssue: (state, action) => {
      // @ts-ignore
      state.issue.title = action.payload.title;
    },
    setIssues: (state, action) => {
      state.issues = action.payload.data;
    },
    // deleteIssue:(state,action)=>{
    //   state.issues=state.issues.filter(issue=>issue!==action.payload);
    // },
    setCards: (state, action) => {
      state.cards = action.payload;
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(setUser, (state: any, action: any) => {
      state.users = [action.payload, ...state.users];
    });
    // // eslint-disable-next-line @typescript-eslint/no-use-before-define
    // builder.addCase(setIssue, (state: any, action: any) => {
    //   state.issues = [action.payload, ...state.issues];
    // });
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
  setIssue,
  setIssues,
  setCards,
} = gameSlice.actions;

export default gameSlice.reducer;
