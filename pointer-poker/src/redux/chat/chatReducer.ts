import { createSlice } from '@reduxjs/toolkit';



export interface ChatState {
  messages: Array<any>;

}

const initialState: ChatState = {
  messages: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = [...state.messages,action.payload.data];
    },
  },
});

export const {
  setMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
