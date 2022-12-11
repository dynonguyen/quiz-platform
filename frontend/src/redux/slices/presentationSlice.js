import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// -----------------------------
export const savePresentation = createAsyncThunk(
  'presentation/savePresentation',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    console.log(state);
  }
);

// -----------------------------
const initialState = {
  _id: null,
  saving: false,
  isPresenting: false
};

// -----------------------------
const presentationSlice = createSlice({
  name: 'presentation',
  initialState,
  reducers: {
    updatePresentation(state, action) {
      return { ...state, ...action.payload };
    },
    addPresentation(state, action) {
      return {
        ...action.payload,
        saving: state.saving,
        isPresenting: state.isPresenting
      };
    },
    removePresentation() {
      return { ...initialState };
    }
  }
});

const { reducer, actions } = presentationSlice;
export const { addPresentation, removePresentation, updatePresentation } =
  actions;
export default reducer;
