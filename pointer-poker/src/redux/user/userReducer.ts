import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  firstName: string;
  lastName?: string;
  jobPosition: string;
  img: string | null | {};
  id: number | null | string;
  isScrumMaster: boolean;
  // type: 'player' | 'observer';
  type: string;
  fallbackText: string;
  voite: number | null;
}

const initialState: UserState = {
  firstName: '',
  lastName: '',
  jobPosition: '',
  img: '',
  id: null,
  isScrumMaster: false,
  type: 'player',
  fallbackText: '',
  voite: null,
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
    setFallbackText: (state, action) => {
      state.fallbackText = action.payload.value;
    },
    setVoite: (state, action) => {
      state.voite = action.payload.value;
    },
    setUser: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.jobPosition = action.payload.jobPosition;
      state.id = action.payload.id;
      state.img = action.payload.img;
      state.type = action.payload.type;
      state.isScrumMaster = action.payload.isScrumMaster;
      state.fallbackText = action.payload.fallbackText;
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
  setVoite,
} = userSlice.actions;

export default userSlice.reducer;
