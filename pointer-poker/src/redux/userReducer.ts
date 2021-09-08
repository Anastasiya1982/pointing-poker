import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface UserState {
  firstName: string;
  lastName?: string;
  jobPosition: string;
  img: string;
  id: string;
  isScrumMaster: boolean;
  type: 'player' | 'observer';
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName: '',
    lastName: '',
    jobPosition: '',
    img: '',
    id: '',
    isScrumMaster: false,
    type: 'player',
  } as UserState,
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload.value;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload.value;
    },
    setJobPosition: (state, action) => {
      state.jobPosition = action.payload.value;
    },
    setImg: (state, action) => {
      state.img = action.payload.value;
    },
    setId: (state, action) => {
      state.id = action.payload.value;
    },
    setIsScrumMaster: (state, action: PayloadAction<boolean>) => {
      state.isScrumMaster = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload.value;
    },
  },
});
export const {
  setFirstName,
  setLastName,
  setJobPosition,
  setImg,
  setId,
  setIsScrumMaster,
  setType,
} = userSlice.actions;

export const selectCount = (state: RootState) => state.user;

export default userSlice.reducer;
