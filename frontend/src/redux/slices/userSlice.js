import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '~/apis/userApi';

// -----------------------------
export const getUserInfo = createAsyncThunk(
  'users/getUserInfo',
  async (_, thunkAPI) => {
    try {
      console.log('RUN');
      const apiRes = await userApi.getUserInfo();
      const { status } = apiRes;
      if (status === 200) {
      }
    } catch (error) {}
  }
);

// -----------------------------
const initialState = {
  isAuth: false,
  accountId: '',
  username: '',
  name: '',
  avt: ''
};

// -----------------------------
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}
});

const { reducer, actions } = userSlice;
export const {} = actions;
export default reducer;
