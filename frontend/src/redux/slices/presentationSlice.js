import { createSlice } from '@reduxjs/toolkit';

// -----------------------------
const initialState = {
  _id: null
};

// -----------------------------
const presentationSlice = createSlice({
  name: 'presentation',
  initialState,
  reducers: {
    addPresentation(_, action) {
      return action.payload;
    },
    removePresentation() {
      return { _id: null };
    }
  }
});

const { reducer, actions } = presentationSlice;
export const { addPresentation, removePresentation } = actions;
export default reducer;
