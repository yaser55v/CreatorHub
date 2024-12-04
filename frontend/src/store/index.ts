import { configureStore } from '@reduxjs/toolkit';
import languageReducer from '@/store/slices/languageSlice';
import authReducer from '@/store/slices/authSlice'; 

export const store = configureStore({
  reducer: {
    language: languageReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
