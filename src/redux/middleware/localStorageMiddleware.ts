import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState() as RootState;
  localStorage.setItem('notes', JSON.stringify(state.notes.notes));
  localStorage.setItem('deletedNotes', JSON.stringify(state.notes.deletedNotes));
  return result;
};

export default localStorageMiddleware;
