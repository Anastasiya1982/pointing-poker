import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';

export interface UserState {
  firstName: string;
  lastName?: string;
  jobPosition: string;
  img: string | null | {};
  id: number | null;
  isScrumMaster: boolean;
  // type: 'player' | 'observer';
  type: string;
}

const initialState: UserState = {
  firstName: '',
  lastName: '',
  jobPosition: '',
  img: '',
  id: null,
  isScrumMaster: false,
  type: 'player',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
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
      state.img = action.payload;
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
   setUser: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.jobPosition = action.payload.jobPosition;
      state.id = action.payload.id;
      state.img = action.payload.img;
      state.type = action.payload.type;
      state.isScrumMaster = action.payload;
    },
  },
});


export const {
  setFirstName,
  setLastName,
  setJobPosition,
  setImg,
  setType,
  setId,
  setIsScrumMaster,
  setUser,
} = userSlice.actions;

export default userSlice.reducer;
