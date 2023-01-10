import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import presentationApi from '~/apis/presentationApi';
import { SOCKET_EVENTS } from '~/constant/socket';
import { socket } from '~/socket';

// -----------------------------
export const savePresentation = createAsyncThunk(
  'presentation/savePresentation',
  async (updateFields, thunkAPI) => {
    const presentation = thunkAPI.getState().presentation;
    const { _id } = presentation;
    if (!_id) return;

    try {
      let apiRes;
      if (updateFields.updateAnswers) {
        apiRes = await presentationApi.putUpdateAnswers({ _id }, updateFields);
      } else {
        apiRes = await presentationApi.putUpdatePresentation(
          { _id },
          updateFields
        );
      }
      if (apiRes.status === 200) {
        thunkAPI.dispatch(updatePresentation(updateFields));
        socket.emit(SOCKET_EVENTS.UPDATE_PRESENTATION, updateFields);
      }
    } catch (error) {
      toast.error('Cập nhật bản trình chiếu đã xảy ra lỗi, thử lại');
    }
  }
);

// -----------------------------
const initialState = {
  _id: null,
  slides: [],
  saving: false,
  isPresenting: false,
  activeSlide: 1,
  openMobileSetting: false,
  loading: true
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
      return { ...initialState, loading: false, ...action.payload };
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
