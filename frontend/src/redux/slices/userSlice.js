import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: ''
};

const userSlice = createSlice({
  name: 'user-slice',
  initialState,
  reducers: {}
});

const { reducer, actions } = userSlice;
export const {} = actions;
export default reducer;
