import { configureStore } from '@reduxjs/toolkit';
import { isProduction } from '~/helper';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer
  },
  devTools: !isProduction()
});

export default store;
