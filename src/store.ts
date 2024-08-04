// store/store.ts

import { configureStore } from '@reduxjs/toolkit';
import notesSlice from './redux/notesSlice';
import localStorageMiddleware from './redux/middleware/localStorageMiddleware';

const store = configureStore({
  reducer: {
    notes: notesSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
