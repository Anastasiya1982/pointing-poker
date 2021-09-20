import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { gameSlice } from './game/gameReducer';
import { userSlice } from './user/userReducer';
import { chatSlice } from './chat/chatReducer';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  game: gameSlice.reducer,
  chat: chatSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
