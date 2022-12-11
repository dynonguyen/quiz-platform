import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import presentationApi from '~/apis/presentationApi';

// -----------------------------
export const savePresentation = createAsyncThunk(
  'presentation/savePresentation',
  async (updateFields, thunkAPI) => {
    const presentation = thunkAPI.getState().presentation;
    const { _id } = presentation;
    if (!_id) return;

    try {
      const apiRes = await presentationApi.putUpdatePresentation(
        { _id },
        updateFields
      );
      if (apiRes.status === 200) {
        thunkAPI.dispatch(updatePresentation(updateFields));
      }
    } catch (error) {
      toast.error('Cập nhật bản trình chiếu đã xảy ra lỗi, thử lại');
    }
  }
);

// -----------------------------
const initialState = {
  _id: null,
  slices: [],
  saving: false,
  isPresenting: false,
  activeSlide: 1,
  openMobileSetting: false
};

// -----------------------------
const presentationSlice = createSlice({
  name: 'presentation',
  initialState,
  reducers: {
    updatePresentation(state, action) {
      return { ...state, ...action.payload };
    },
    addPresentation(_, action) {
      return { ...initialState, ...action.payload };
    },
    removePresentation() {
      return { ...initialState };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(savePresentation.pending, (state) => {
        state.saving = true;
      })
      .addCase(savePresentation.fulfilled, (state) => {
        state.saving = false;
      });
  }
});

const { reducer, actions } = presentationSlice;
export const { addPresentation, removePresentation, updatePresentation } =
  actions;
export default reducer;
