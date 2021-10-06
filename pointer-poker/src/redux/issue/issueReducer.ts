import { createSlice } from '@reduxjs/toolkit';

export interface IssueType {
  title: string;
  priority?: string;
  results?: Array<number> | null;
}

export interface IssueState {
  issue: IssueType | null;
  issues: Array<IssueType>;
  activeIssue: IssueType | null;
}

const initialState: IssueState = {
  issue: {
    title: '',
    priority: '',
    results: null,
  },
  issues: [],
  activeIssue: null,
};

export const issueSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setIssue: (state, action) => {
      // @ts-ignore
      state.issue.title = action.payload;
    },
    setIssues: (state, action) => {
      state.issues = action.payload.data;
    },
    setActiveIssue: (state, action) => {
      state.activeIssue = action.payload.data;
    },
  },
});

export const { setIssue, setIssues, setActiveIssue } = issueSlice.actions;

export default issueSlice.reducer;
