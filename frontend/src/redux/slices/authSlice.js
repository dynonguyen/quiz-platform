import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: ''
};

const authSlice = createSlice({
  name: 'auth-slice',
  initialState,
  reducers: {}
});

const { reducer, actions } = authSlice;
export const {} = actions;
export default reducer;
