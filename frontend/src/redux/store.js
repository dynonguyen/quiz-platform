import { configureStore } from '@reduxjs/toolkit';
import { isProduction } from '~/helper';
import presentationReducer from './slices/presentationSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    presentation: presentationReducer
  },
  devTools: !isProduction()
});

export default store;
